"use client";

import { useShow } from "@refinedev/core";
import { Show, TagField } from "@refinedev/antd";
import { Typography, Descriptions, Tag } from "antd";
import { IStudent } from "../../../../interfaces/IStudent";

const { Title } = Typography;

export default function StudentShow() {
    const { query } = useShow<IStudent>();
    const { data, isLoading } = query;
    
    const record = data?.data;

    const getStatusColor = (status: string | undefined) => {
        if (status === "Đang học") return "green";
        if (status === "Bảo lưu") return "orange";
        if (status === "Thôi học") return "red";
        return "default";
    };

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Thông tin chung</Title>
            <Descriptions bordered column={2}>
                <Descriptions.Item label="Mã SV">{record?.student_code}</Descriptions.Item>
                <Descriptions.Item label="Họ tên">{record?.full_name}</Descriptions.Item>
                <Descriptions.Item label="Email">{record?.email}</Descriptions.Item>
                <Descriptions.Item label="SĐT">{record?.phone}</Descriptions.Item>
                <Descriptions.Item label="Giới tính">{record?.gender}</Descriptions.Item>
                <Descriptions.Item label="Địa chỉ">{record?.address}</Descriptions.Item>
            </Descriptions>

            <Title level={5} style={{ marginTop: 20 }}>Đào tạo hiện tại</Title>
            <Descriptions bordered column={3}>
                <Descriptions.Item label="Ngành">{record?.current_education?.university_major}</Descriptions.Item>
                <Descriptions.Item label="Lớp">{record?.current_education?.class_name}</Descriptions.Item>
                <Descriptions.Item label="Trạng thái">
                    <Tag color={getStatusColor(record?.current_education?.status)}>
                        {record?.current_education?.status}
                    </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Năm nhập học">{record?.current_education?.enrollment_year}</Descriptions.Item>
                <Descriptions.Item label="Hình thức đào tạo">{record?.current_education?.study_mode}</Descriptions.Item>
                <Descriptions.Item label="Kỳ học hiện tại">{record?.current_education?.current_semester}</Descriptions.Item>
            </Descriptions>

            <Title level={5} style={{ marginTop: 20 }}>Lịch sử Liên thông</Title>
            <Descriptions bordered column={2}>
                <Descriptions.Item label="Trường cũ">{record?.previous_education?.college_name}</Descriptions.Item>
                <Descriptions.Item label="Ngành cũ">{record?.previous_education?.college_major}</Descriptions.Item>
                <Descriptions.Item label="Năm tốt nghiệp">{record?.previous_education?.graduation_year}</Descriptions.Item>
                <Descriptions.Item label="GPA">{record?.previous_education?.college_gpa}</Descriptions.Item>
                <Descriptions.Item label="Xếp loại">{record?.previous_education?.degree_rank}</Descriptions.Item>
            </Descriptions>

            <Title level={5} style={{ marginTop: 20 }}>Thông tin chuyển đổi</Title>
            <Descriptions bordered column={2}>
                <Descriptions.Item label="Tín chỉ được miễn">{record?.transfer_info?.exempted_credits} tín chỉ</Descriptions.Item>
                <Descriptions.Item label="Tín chỉ cần hoàn thành">{record?.transfer_info?.required_credits} tín chỉ</Descriptions.Item>
            </Descriptions>
        </Show>
    );
};