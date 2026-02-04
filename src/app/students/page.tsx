"use client";
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  MarkdownField,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { type BaseRecord, useMany } from "@refinedev/core";
import { Space, Table } from "antd";
import { type UserRecord} from "@/types/student"
export default function StudentListPage() {
  const { result, tableProps } = useTable({
    syncWithLocation: true,
  });

  console.log(result)

  return (
    <List>
      {/* Code | Name | Email | Phone | Gender | Major | Class | Semester | Status | Year | Actions */}
      <Table<UserRecord> {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column dataIndex="student_code" title={"Code"} />
        <Table.Column dataIndex="full_name" title={"Name"} />
        <Table.Column dataIndex="phone" title={"Phone"} />
        <Table.Column dataIndex="gender" title={"Gender"} />

        <Table.Column
          title={"Major"}
          dataIndex={["current_education", "university_major"]}
        />

        <Table.Column
          title={"Class"}
          dataIndex={["current_education", "class_name"]}
        />

        <Table.Column
          title={"Semester"}
          dataIndex={["current_education", "current_semester"]}
        />

        <Table.Column
          title={"Status"}
          dataIndex={["current_education", "status"]}
        />

        <Table.Column
          title={"Year"}
          dataIndex={["current_education", "enrollment_year"]}
        />

        <Table.Column<UserRecord>
          title="Actions"
          key="actions"
          align="center"
          width={150}
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
}
