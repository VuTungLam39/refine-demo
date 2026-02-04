"use client";

import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select, InputNumber, Row, Col, Divider } from "antd";
import { IStudent } from "../../../interfaces/IStudent";
import { GENDER_OPTIONS, STATUS_OPTIONS } from "../../../constants/student";

export default function StudentCreate() {
    const { form, formProps, saveButtonProps } = useForm<IStudent>();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} form={form} layout="vertical">
                <Divider orientation="left">Thông tin cá nhân</Divider>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Mã Sinh Viên"
                            name="student_code"
                            rules={[{ required: true, message: "Vui lòng nhập mã SV" }]}
                        >
                            <Input placeholder="VD: PH12345" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Họ và tên"
                            name="full_name"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Email" name="email">
                            <Input type="email" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Số điện thoại" name="phone">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Giới tính" name="gender">
                            <Select options={GENDER_OPTIONS} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Địa chỉ" name="address">
                            <Input.TextArea />
                        </Form.Item>
                    </Col>
                </Row>

                <Divider orientation="left">Đào tạo tại Đại học</Divider>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item 
                            label="Ngành học" 
                            name={["current_education", "university_major"]}
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item 
                            label="Lớp" 
                            name={["current_education", "class_name"]}
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item 
                            label="Trạng thái" 
                            name={["current_education", "status"]}
                            initialValue="Đang học"
                        >
                            <Select options={STATUS_OPTIONS} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Năm nhập học" name={["current_education", "enrollment_year"]}>
                            <InputNumber style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Hình thức đào tạo" name={["current_education", "study_mode"]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Kỳ học hiện tại" name={["current_education", "current_semester"]}>
                            <InputNumber style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Divider orientation="left">Hồ sơ Liên thông (Trường cũ)</Divider>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item 
                            label="Trường Cao đẳng cũ" 
                            name={["previous_education", "college_name"]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            label="Chuyên ngành CĐ" 
                            name={["previous_education", "college_major"]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item 
                            label="Năm tốt nghiệp CĐ" 
                            name={["previous_education", "graduation_year"]}
                        >
                            <InputNumber style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item 
                            label="GPA (Điểm TB)" 
                            name={["previous_education", "college_gpa"]}
                        >
                            <InputNumber step={0.1} min={0} max={10} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item 
                            label="Xếp loại tốt nghiệp" 
                            name={["previous_education", "degree_rank"]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                
                <Divider orientation="left">Thông tin chuyển đổi</Divider>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item 
                            label="Tín chỉ được miễn" 
                            name={["transfer_info", "exempted_credits"]}
                        >
                            <InputNumber style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            label="Tín chỉ cần hoàn thành" 
                            name={["transfer_info", "required_credits"]}
                        >
                            <InputNumber style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Create>
    );
};