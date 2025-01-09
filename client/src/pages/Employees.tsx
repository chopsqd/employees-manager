import React from "react";
import { Button, Table } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { useGetAllEmployeesQuery } from "../store/services/employees";
import { EmployeeType } from "../types/user.types";
import useRequireAuth from "../hooks/useRequireAuth";

const COLUMNS: ColumnsType<EmployeeType> = [
  { title: "Имя", dataIndex: "firstName", key: "firstName" },
  { title: "Возраст", dataIndex: "age", key: "age" },
  { title: "Адрес", dataIndex: "address", key: "address" }
];

export const Employees = () => {
  useRequireAuth();
  
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllEmployeesQuery();

  return (
    <div>
      <Button
        onClick={() => null}
        icon={<PlusCircleOutlined />}
      >
        Добавить
      </Button>

      <Table
        loading={isLoading}
        dataSource={data}
        columns={COLUMNS}
        rowKey={(record) => record.id}
        onRow={(record) => ({
          onClick: () => navigate(`/employee/${record.id}`)
        })}
      />
    </div>
  );
};