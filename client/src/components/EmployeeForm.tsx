import React from "react";
import { EmployeeType } from "../types/user.types";
import { Alert, Button, Card, Form, Input, Space } from "antd";

interface IEmployeeFormProps {
  onFinish: (values: EmployeeType) => void;
  btnText: string;
  title: string;
  error?: string;
  employee?: EmployeeType;
}

export const EmployeeForm: React.FC<IEmployeeFormProps> = ({ onFinish, btnText, title, error, employee }) => {
  return (
    <Card title={title} style={{ width: "30rem" }}>
      <Form
        name={"employee-form"}
        onFinish={onFinish}
        initialValues={employee}
      >
        <Form.Item
          name={"firstName"}
          rules={[{ required: true, message: "Обязательное поле" }]}
          shouldUpdate
        >
          <Input
            placeholder={"Имя"}
            type={"text"}
            size={"large"}
          />
        </Form.Item>

        <Form.Item
          name={"lastName"}
          rules={[{ required: true, message: "Обязательное поле" }]}
          shouldUpdate
        >
          <Input
            placeholder={"Фамилия"}
            type={"text"}
            size={"large"}
          />
        </Form.Item>

        <Form.Item
          name={"age"}
          rules={[{ required: true, message: "Обязательное поле" }]}
          shouldUpdate
        >
          <Input
            placeholder={"Возраст"}
            type={"number"}
            size={"large"}
          />
        </Form.Item>

        <Form.Item
          name={"address"}
          rules={[{ required: true, message: "Обязательное поле" }]}
          shouldUpdate
        >
          <Input
            placeholder={"Адрес"}
            type={"text"}
            size={"large"}
          />
        </Form.Item>

        <Space>
          {error && <Alert message={error} type="error" />}

          <Button type={"primary"} htmlType={"submit"}>
            {btnText}
          </Button>
        </Space>
      </Form>
    </Card>
  );
};