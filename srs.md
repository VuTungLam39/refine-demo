# 📘 SRS – Hệ thống Quản lý Nhà hàng Buffet / Gọi món bằng QR Code

---

# 1. Tổng quan dự án

## 1.1. Tên dự án

**Restaurant QR Ordering & Buffet Management System (SaaS)**

---

## 1.2. Mục tiêu

Xây dựng hệ thống cho phép:

* Khách đặt món trực tiếp tại bàn thông qua **QR Code**
* Hỗ trợ 2 mô hình phục vụ:

  * Gọi món theo menu (À la carte)
  * Buffet
* Hỗ trợ khách **đặt bàn trước**
* Giảm tải cho nhân viên phục vụ
* Tăng trải nghiệm người dùng
* Tối ưu quy trình vận hành nhà hàng
* Dễ dàng mở rộng nhiều chi nhánh (SaaS)

---

# 2. Đối tượng sử dụng (Actors)

| Actor         | Mô tả                                   |
| ------------- | --------------------------------------- |
| Khách hàng    | Quét QR, xem menu, đặt món, chọn buffet |
| Nhân viên     | Tạo QR cho bàn, quản lý trạng thái bàn  |
| Quản lý/Admin | Quản lý menu, bàn, đơn hàng, báo cáo    |
| Chủ hệ thống  | Quản lý nhiều chi nhánh (SaaS Admin)    |

---

# 3. Tech Stack

## 3.1 Backend

* NestJS
* TypeORM
* PostgreSQL / MySQL
* JWT Authentication
* QR Code Generator
* RESTful API

---

## 3.2 Frontend

* Next.js
* Tailwind CSS / Ant Design
* Axios / Fetch API
* Responsive Design (mobile-first)
* Refine (Admin Dashboard)

---

# 4. Mô hình nghiệp vụ tổng quát (Business Flow)

---

## Flow 1: Khách đến bàn – gọi món tại bàn (QR)

1. Nhân viên chọn bàn → hệ thống tạo QR Code duy nhất
2. Khách quét QR → truy cập giao diện đặt món
3. Khách:

   * Xem menu
   * Thêm món vào giỏ
   * Gửi đơn
4. Đơn được gửi về bếp / thu ngân

---

## Flow 2: Khách chọn Buffet

1. Khách quét QR hoặc nhân viên tạo order buffet
2. Khách chọn gói buffet
3. Hệ thống:

   * Giới hạn thời gian
   * Giới hạn số lượng/món
4. Khách gọi món trong phạm vi buffet

---

## Flow 3: Khách đặt bàn trước

1. Khách truy cập website
2. Chọn:

   * Ngày giờ
   * Số người
3. Hệ thống kiểm tra bàn trống
4. Khi khách đến → nhân viên check-in → tạo QR cho bàn

---

# 5. SRS – Software Requirements Specification

---

## 5.1 Functional Requirements (Yêu cầu chức năng)

---

### 5.1.1 Quản lý bàn

Hệ thống phải cho phép:

* Tạo bàn
* Cập nhật thông tin bàn
* Xóa bàn
* Cập nhật trạng thái:

  * Trống (Available)
  * Đã đặt trước (Reserved)
  * Đang phục vụ (Occupied)
* Mỗi bàn có mã định danh duy nhất

---

### 5.1.2 QR Code tại bàn

* Nhân viên tạo QR cho từng phiên ngồi
* QR chứa:

  * tableId
  * sessionId
* QR chỉ hợp lệ trong session
* QR tự hết hạn khi thanh toán xong

---

### 5.1.3 Đặt món tại bàn

Khách **không cần đăng nhập**

Chức năng:

* Xem menu theo danh mục
* Xem chi tiết món
* Thêm / xóa / cập nhật số lượng
* Gửi đơn
* Có thể gửi nhiều lần trong cùng 1 session
* Theo dõi trạng thái món

---

### 5.1.4 Buffet

Quản lý gói buffet:

* Giá
* Thời gian
* Danh sách món

Khách:

* Chọn buffet
* Gọi món trong phạm vi cho phép

Hệ thống kiểm soát:

* Thời gian sử dụng
* Số lượng món
* Giới hạn lãng phí

---

### 5.1.5 Đặt bàn trước

Khách nhập thông tin:

* Tên
* SĐT
* Ngày giờ
* Số người

Hệ thống:

* Kiểm tra bàn trống
* Lưu lịch đặt
* Gửi xác nhận
* Nhân viên check-in khi khách đến

---

### 5.1.6 Quản lý đơn hàng

Trạng thái đơn:

* Pending
* Cooking
* Served
* Paid

Chức năng:

* Gửi đơn đến bếp
* Cập nhật trạng thái
* Gộp nhiều order vào một bill
* Hủy món (có ghi log)

---

### 5.1.7 Thanh toán

* Thanh toán tại quầy
* Thanh toán theo bàn
* Hỗ trợ nhiều phương thức:

  * Tiền mặt
  * Chuyển khoản
  * Gateway (tùy chọn)
* Kết thúc session → QR hết hiệu lực
* Bàn chuyển trạng thái trống

---

---

# 5.2 Non-Functional Requirements (Phi chức năng)

| Yêu cầu     | Mô tả                       |
| ----------- | --------------------------- |
| Hiệu năng   | Tải nhanh trên mobile (<2s) |
| Bảo mật     | QR chỉ hợp lệ trong session |
| Khả dụng    | Giao diện dễ dùng           |
| Mở rộng     | Hỗ trợ nhiều chi nhánh      |
| Ổn định     | Không mất order khi reload  |
| Bảo mật     | JWT + Hash password         |
| Khả mở rộng | Hỗ trợ ≥ 100 bàn đồng thời  |

---

# 6. Thiết kế Database (khái quát)

Các bảng chính:

* users
* tables
* table_sessions
* qr_codes
* menus
* menu_categories
* buffet_packages
* buffet_items
* orders
* order_items
* reservations
* payments

---

# 7. Kiến trúc hệ thống

```
Next.js (Client)
        |
     REST API
        |
     NestJS
        |-- Auth Module
        |-- Table Module
        |-- QR Module
        |-- Order Module
        |-- Buffet Module
        |-- Reservation Module
        |
     Database (TypeORM)
```

---

# 8. Tiêu chí hoàn thành hệ thống

Hệ thống được coi là hoàn thành khi:

* Khách quét QR gọi món thành công
* Order hiển thị realtime cho nhân viên
* Thanh toán đóng session tự động
* Bàn được trả về trạng thái trống
* Báo cáo chính xác
* Phân quyền đúng

---

# 9. Kế hoạch phát triển

## Phase 1 (MVP)

* QR Order
* Quản lý bàn
* Thanh toán cơ bản

## Phase 2

* Payment Gateway
* POS
* Khuyến mãi
* Báo cáo nâng cao
* Mobile App

---

# 10. Tài liệu tham khảo

* NestJS Docs
* Next.js Docs
* Refine Docs
* RESTful API Design Guidelines

---

📌 **End of Document**
