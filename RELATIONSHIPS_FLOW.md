# Restaurant QR SaaS – Luồng & Mối quan hệ Database

Tài liệu này mô tả:
- Quan hệ giữa các bảng (ERD)
- Luồng nghiệp vụ chính: QR Order, Buffet, Reservation, Payment
- Các ràng buộc quan trọng (unique/index) để bảo đảm đúng SRS

---

## 1) Tổng quan mô hình (SaaS – đa chi nhánh)

Hệ thống theo mô hình **multi-tenant**:
- Mọi dữ liệu nghiệp vụ đều thuộc về 1 `tenant` (chi nhánh / nhà hàng).
- Các bảng nghiệp vụ đều có `tenant_id` để tách dữ liệu theo chi nhánh.

**Root:**
- `tenants` (1) —— (N) `users`, `tables`, `menus`, `orders`, ...

---

## 2) ERD – Mối quan hệ giữa các bảng

### 2.1 Tenant & Users
- `tenants (1) -> (N) users`
  - 1 nhà hàng/chi nhánh có nhiều user.
  - `users.role`: `saas_admin | admin | staff`
  - Unique: `(tenant_id, email)` đảm bảo cùng 1 tenant không trùng email.

---

### 2.2 Tables & Table Sessions (bàn và phiên ngồi)
- `tenants (1) -> (N) tables`
- `tables (1) -> (N) table_sessions`
  - 1 bàn có nhiều phiên ngồi theo thời gian.
  - `table_sessions.status`: `active | closed`
  - Unique: `(tenant_id, session_code)` để định danh session theo tenant.

**Ý nghĩa:**
- Khi khách vào bàn, hệ thống mở 1 `table_session` mới (status = active).
- Khi thanh toán xong, session kết thúc (status = closed, ended_at set).

---

### 2.3 QR Codes (QR theo session)
- `tables (1) -> (N) qr_codes`
- `table_sessions (1) -> (N) qr_codes`
- `tenants (1) -> (N) qr_codes`

**Ràng buộc:**
- `qr_codes.session_id` bắt buộc.
- `expires_at` + `is_active` để vô hiệu QR.
- `payload_json` lưu nội dung (ví dụ `{tableId, sessionId}`).

**Ý nghĩa:**
- QR chỉ hợp lệ trong đúng `session`.
- Khi session đóng, QR set `is_active=false` hoặc hết hạn.

---

### 2.4 Menu & Category
- `tenants (1) -> (N) menu_categories`
- `menu_categories (1) -> (N) menus`
- `tenants (1) -> (N) menus`

**Ý nghĩa:**
- Menu thuộc tenant, phân loại theo category.
- `menus.is_active` dùng để ẩn/hiện món.

---

### 2.5 Buffet Packages & Buffet Items
- `tenants (1) -> (N) buffet_packages`
- `buffet_packages (1) -> (N) buffet_items`
- `menus (1) -> (N) buffet_items`

**Bảng nối many-to-many:**
- buffet package chứa nhiều món
- 1 món có thể nằm trong nhiều gói

**Ràng buộc:**
- Unique: `(tenant_id, buffet_package_id, menu_id)` tránh trùng món trong cùng 1 gói.
- `rules_json` lưu giới hạn: `maxItemsPerOrder`, `maxSameItem`, `wastePolicy`...

---

### 2.6 Orders & Order Items
- `table_sessions (1) -> (N) orders`
- `tables (1) -> (N) orders`
- `orders (1) -> (N) order_items`
- `menus (1) -> (N) order_items`

**Trạng thái:**
- `orders.status`: `pending | cooking | served | paid | canceled`
- `order_items.status`: `pending | cooking | served | canceled`

**Ý nghĩa:**
- Khách có thể gửi nhiều đơn trong cùng 1 session:
  - Mỗi lần bấm “Gửi đơn” -> tạo 1 record `orders`
  - Các món trong đơn -> `order_items`

**Snapshot:**
- `name_snapshot`, `unit_price_snapshot`
  - Đảm bảo giá/tên tại thời điểm gọi món không bị thay đổi nếu menu cập nhật sau đó.

**Phân loại order:**
- `orders.type`: `a_la_carte | buffet`
- `order_items.is_buffet_item` để phân biệt món tính theo buffet hay tính tiền.

---

### 2.7 Order Item Logs (log huỷ món/đổi trạng thái)
- `order_items (1) -> (N) order_item_logs`
- `users (1) -> (N) order_item_logs` (optional theo `created_by_user_id`)

**Ý nghĩa:**
- Khi huỷ món, đổi số lượng, đổi trạng thái:
  - Tạo log để audit (đúng SRS: “Hủy món có ghi log”).

---

### 2.8 Reservations (đặt bàn trước)
- `tenants (1) -> (N) reservations`
- `tables (1) -> (N) reservations` (optional)

**Trạng thái:**
- `pending | confirmed | arrived | canceled | no_show`

**Ý nghĩa:**
- Khách đặt bàn trước có thể **chưa gán bàn** ngay.
- Khi check-in, nhân viên có thể gán `table_id`, mở session và tạo QR.

---

### 2.9 Payments (thanh toán theo session/bàn)
- `table_sessions (1) -> (1) payments` (theo unique index `(tenant_id, session_id)`)
- `tables (1) -> (N) payments`
- `tenants (1) -> (N) payments`

**Trạng thái:**
- `unpaid | paid | refunded`
- `method`: `cash | bank_transfer | gateway`

**Ý nghĩa:**
- 1 session chỉ có 1 payment “tổng bill” (theo unique).
- Khi payment = paid:
  - session đóng
  - QR hết hiệu lực
  - bàn chuyển `available`

---

## 3) Luồng nghiệp vụ chính (Flow)

### Flow A — Khách đến bàn gọi món bằng QR
1. Nhân viên chọn `tables` -> tạo `table_sessions` (status = `active`)
2. Tạo `qr_codes` gắn `session_id` + `table_id`
3. Khách quét QR:
   - Frontend đọc `sessionId`, `tableId` từ QR payload
4. Khách gọi món:
   - Mỗi lần “Gửi đơn” -> tạo `orders`
   - Các món -> tạo `order_items`
5. Nhân viên/bếp cập nhật trạng thái món:
   - update `order_items.status` (pending -> cooking -> served)
   - có thể update `orders.status` theo tổng quan

**Quan hệ dùng trong flow:**
- tables -> table_sessions -> qr_codes
- table_sessions -> orders -> order_items

---

### Flow B — Khách chọn Buffet
1. Khi mở session, có thể set `table_sessions.buffet_package_id`
2. Khách gọi món buffet:
   - tạo `orders.type = buffet`
   - `order_items.is_buffet_item = true`
3. Kiểm soát giới hạn:
   - kiểm tra `buffet_packages.rules_json`
   - kiểm tra món có thuộc gói qua `buffet_items`

**Quan hệ dùng trong flow:**
- table_sessions -> buffet_packages
- buffet_packages -> buffet_items -> menus
- orders/order_items đánh dấu buffet

---

### Flow C — Đặt bàn trước (Reservation)
1. Khách tạo `reservations` (status `pending/confirmed`)
2. Khi khách đến:
   - nhân viên đổi `reservations.status = arrived`
   - (optional) gán `table_id`
   - tạo `table_sessions` + `qr_codes`

**Quan hệ dùng trong flow:**
- reservations -> tables (optional)
- tables -> table_sessions -> qr_codes

---

### Flow D — Thanh toán & đóng session
1. Thu ngân tính tổng:
   - buffet: thường là tính theo gói + phụ thu (nếu có)
   - à la carte: sum `order_items.unit_price_snapshot * quantity` (món không buffet)
2. Tạo/Update `payments` theo `session_id`
3. Khi `payments.status = paid`:
   - set `table_sessions.status = closed`, `ended_at`
   - set `qr_codes.is_active=false`
   - set `tables.status = available`
   - update `orders.status = paid` (tuỳ quy ước)

**Quan hệ dùng trong flow:**
- table_sessions -> payments
- payments paid -> đóng session -> reset tables + qr_codes

---

## 4) Ràng buộc quan trọng (để đúng SRS)

- QR chỉ hợp lệ theo session:
  - `qr_codes.session_id` bắt buộc
  - `expires_at` + `is_active`
- 1 session chỉ có 1 bill:
  - unique `(tenant_id, session_id)` trong `payments`
- Không mất order khi reload:
  - order lưu ở DB (orders/order_items), client chỉ fetch lại theo session
- Audit huỷ món:
  - ghi vào `order_item_logs`

---

## 5) Gợi ý mapping API (REST) nhanh cho NestJS

- `GET /public/qr/:sessionId` -> validate session + trả menu/buffet info
- `POST /public/orders` -> tạo order + order_items theo session
- `PATCH /admin/order-items/:id/status` -> bếp cập nhật trạng thái
- `POST /admin/payments` -> tạo thanh toán
- `POST /admin/sessions/:id/close` -> đóng session + reset table + disable qr

---

## 6) Tóm tắt quan hệ dạng “chuỗi”

- Tenant -> Users
- Tenant -> Tables -> TableSessions -> QRCodes
- Tenant -> MenuCategories -> Menus
- Tenant -> BuffetPackages -> BuffetItems -> Menus
- TableSessions -> Orders -> OrderItems -> OrderItemLogs
- Tenant -> Reservations (optional -> Tables)
- TableSessions -> Payments (1-1 theo session)
