import React, { useState } from "react";
import { Alert, Button, Card, Form, Input, Row, Space, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../store/services/auth";
import useRequireAuth from "../hooks/useRequireAuth";
import { UserType } from "../types/user.types";
import { isErrorWithMessage } from "../utils/is-error-with-message";

export const Register = () => {
  useRequireAuth();

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [registerUser] = useRegisterMutation();

  const register = async (data: UserType) => {
    try {
      await registerUser(data).unwrap();
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
      <Card title={"Зарегистрируйтесь"} style={{ width: "30rem" }}>
        <Form onFinish={register}>
          <Form.Item
            name={"name"}
            rules={[{ required: true, message: "Обязательное поле" }]}
            shouldUpdate
          >
            <Input
              placeholder={"Имя"}
              size={"large"}
            />
          </Form.Item>

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
            hasFeedback
            rules={[
              { required: true, message: "Обязательное поле" },
              {
                validator(_, value) {
                  if (!value) {
                    return Promise.resolve();
                  }

                  return value.length < 6
                    ? Promise.reject(new Error("Пароль должен быть больше 6 символов"))
                    : Promise.resolve();
                }
              }
            ]}
            shouldUpdate
          >
            <Input.Password
              placeholder={"Пароль"}
              type={"password"}
              size={"large"}
            />
          </Form.Item>

          <Form.Item
            name={"confirmPassword"}
            hasFeedback
            rules={[
              { required: true, message: "Обязательное поле" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  return value !== getFieldValue("password")
                    ? Promise.reject(new Error("Пароли должны совпадать"))
                    : Promise.resolve();
                }
              })
            ]}
            shouldUpdate
          >
            <Input.Password
              placeholder={"Повторите пароль"}
              type={"password"}
              size={"large"}
            />
          </Form.Item>

          <Space size={"large"}>
            <Button type={"primary"} htmlType={"submit"}>
              Зарегистрироваться
            </Button>

            <Typography.Text>
              Уже есть аккаунт? <Link to={"/login"}>Войдите</Link>
            </Typography.Text>
          </Space>
        </Form>

        {error && <Alert message={error} type="error" />}
      </Card>
    </Row>
  );
};