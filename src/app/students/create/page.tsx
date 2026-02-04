"use client";

import { Create, useForm } from "@refinedev/antd";
import {
    Form,
    Input,
    Select,
    InputNumber
} from "antd";

export default function CategoryCreate() {
  const { formProps, saveButtonProps } = useForm({});

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">

        <Form.Item
            label="Mã Sinh Viên"
            name={["student_code"]}
            rules={[{ required: true }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Họ và Tên"
            name={["full_name"]}
            rules={[{ required: true }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Email"
            name={["email"]}
            rules={[{ type: "email" }]}
        >
            <Input />
        </Form.Item>

        <Form.Item label="Số điện thoại" name={["phone"]}>
            <Input />
        </Form.Item>

        <Form.Item label="Giới tính" name={["gender"]}>
            <Select
                options={[
                    { value: "Nam", label: "Nam" },
                    { value: "Nữ", label: "Nữ" },
                    { value: "Khác", label: "Khác" },
                ]}
            />
        </Form.Item>

        <Form.Item label="Ngày sinh" name={["date_of_birth"]}>
            <Input type="date" />
        </Form.Item>

        <Form.Item label="CCCD/CMND" name={["citizen_id"]}>
            <Input />
        </Form.Item>

        <Form.Item label="Địa chỉ" name={["address"]}>
            <Input />
        </Form.Item>

        <Form.Item
            label="Chuyên ngành ĐH"
            name={["current_education", "university_major"]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Lớp"
            name={["current_education", "class_name"]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Năm nhập học"
            name={["current_education", "enrollment_year"]}
        >
            <InputNumber className="w-full" />
        </Form.Item>

        <Form.Item
            label="Hình thức học"
            name={["current_education", "study_mode"]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Trạng thái"
            name={["current_education", "status"]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Học kỳ hiện tại"
            name={["current_education", "current_semester"]}
        >
            <InputNumber className="w-full" />
        </Form.Item>


        <Form.Item
            label="Tên trường Cao đẳng"
            name={["previous_education", "college_name"]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Chuyên ngành Cao đẳng"
            name={["previous_education", "college_major"]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Năm tốt nghiệp"
            name={["previous_education", "graduation_year"]}
        >
            <InputNumber className="w-full" />
        </Form.Item>

        <Form.Item
            label="GPA Cao đẳng"
            name={["previous_education", "college_gpa"]}
        >
            <InputNumber step={0.1} className="w-full" />
        </Form.Item>

        <Form.Item
            label="Xếp loại"
            name={["previous_education", "degree_rank"]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Mã chứng chỉ TN"
            name={["previous_education", "graduation_certificate_id"]}
        >
            <Input />
        </Form.Item>


        <Form.Item
            label="Số tín chỉ miễn giảm"
            name={["transfer_info", "exempted_credits"]}
        >
            <InputNumber className="w-full" />
        </Form.Item>

        <Form.Item
            label="Tín chỉ cần học"
            name={["transfer_info", "required_credits"]}
        >
            <InputNumber className="w-full" />
        </Form.Item>

        <Form.Item
            label="Phương thức xét tuyển"
            name={["transfer_info", "admission_method"]}
        >
            <Input />
        </Form.Item>

    </Form>
    </Create>
  );
}
