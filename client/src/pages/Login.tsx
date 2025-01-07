import React, { useState } from "react";
import { Alert, Button, Card, Form, Input, Row, Space, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserType } from "../types/user.types";
import { useLoginMutation } from "../store/services/auth";
import { isErrorWithMessage } from "../utils/is-error-with-message";

export const Login = () => {
  const navigate = useNavigate();
  const [loginMutation] = useLoginMutation();
  const [error, setError] = useState("");

  const login = async (data: UserType) => {
    try {
      await loginMutation(data).unwrap();
      navigate("/");
    } catch (err) {
      if (isErrorWithMessage(err)) {
        setError(err.data.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };

  return (
    <Row align={"middle"} justify={"center"}>
      <Card title={"Войдите"} style={{ width: "30rem" }}>
        <Form onFinish={login}>
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

          <Space size={"large"}>
            <Button type={"primary"} htmlType={"submit"}>
              Войти
            </Button>

            <Typography.Text>
              Нет аккаунта? <Link to={"/register"}>Зарегистрируйтесь</Link>
            </Typography.Text>
          </Space>
        </Form>

        {error && <Alert message={error} type="error" />}
      </Card>
    </Row>
  );
};