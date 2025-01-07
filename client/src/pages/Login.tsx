import React from "react";
import { Button, Card, Form, Input, Row, Space, Typography } from "antd";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <Row align={"middle"} justify={"center"}>
      <Card title={"Войдите"} style={{ width: "30rem" }}>
        <Form onFinish={() => null}>
          <Form.Item
            name={"email"}
            rules={[{ required: true, message: "Обязательное поле" }]}
            shouldUpdate
          >
            <Input
              placeholder={"Email"}
              type={"email"}
              size={"large"}
            />
          </Form.Item>

          <Form.Item
            name={"password"}
            rules={[{ required: true, message: "Обязательное поле" }]}
            shouldUpdate
          >
            <Input.Password
              placeholder={"Пароль"}
              type={"password"}
              size={"large"}
            />
          </Form.Item>

          <Button type={"primary"} htmlType={"submit"}>
            Войти
          </Button>
        </Form>

        <Space direction={"vertical"} size={"large"}>
          <Typography.Text>
            Нет аккаунта? <Link to={"/register"}>Зарегистрируйтесь</Link>
          </Typography.Text>
        </Space>
      </Card>
    </Row>
  );
};