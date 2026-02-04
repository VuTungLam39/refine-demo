"use client";

import { 
    List, 
    useTable, 
    EditButton, 
    ShowButton, 
    DeleteButton, 
    TagField 
} from "@refinedev/antd";
import { Table, Space, Tag } from "antd";
import { IStudent } from "../../interfaces/IStudent";
import { STATUS_OPTIONS } from "../../constants/student";
import { ClientOnly } from "../../components/common/ClientOnly";

export default function StudentList() {
    const { tableProps, filters } = useTable<IStudent>();

    return (
        <List>
            <ClientOnly>
                <Table {...tableProps} rowKey="id">
                    <Table.Column dataIndex="id" title="ID" width={50} />
                    <Table.Column 
                        dataIndex="student_code" 
                        title="Mã SV" 
                        render={(value) => <b>{value}</b>}
                    />
                    <Table.Column dataIndex="full_name" title="Họ tên" />
                    <Table.Column dataIndex="email" title="Email" />
                    <Table.Column dataIndex="phone" title="SĐT" />
                    <Table.Column dataIndex="address" title="Địa chỉ" />
                    
                    <Table.Column 
                        dataIndex={["current_education", "class_name"]} 
                        title="Lớp" 
                    />
                    
                    <Table.Column
                        dataIndex={["current_education", "status"]}
                        title="Trạng thái"
                        render={(value) => {
                            let color = "default";
                            if (value === "Đang học") color = "green";
                            if (value === "Bảo lưu") color = "orange";
                            if (value === "Thôi học") color = "red";
                            return <Tag color={color}>{value}</Tag>;
                        }}
                        filters={STATUS_OPTIONS}
                        onFilter={(value, record) => record.current_education.status === value}
                    />

                    <Table.Column<IStudent>
                        title="Thao tác"
                        dataIndex="actions"
                        render={(_, record) => (
                            <Space>
                                <EditButton hideText size="small" recordItemId={record.id} />
                                <ShowButton hideText size="small" recordItemId={record.id} />
                                <DeleteButton hideText size="small" recordItemId={record.id} />
                            </Space>
                        )}
                    />
                </Table>
            </ClientOnly>
        </List>
    );
};