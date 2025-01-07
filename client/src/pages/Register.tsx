import React from "react";
import { Button, Card, Form, Input, Row, Space, Typography } from "antd";
import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <Row align={"middle"} justify={"center"}>
      <Card title={"Зарегистрируйтесь"} style={{ width: "30rem" }}>
        <Form onFinish={() => null}>
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

          <Button type={"primary"} htmlType={"submit"}>
            Зарегистрироваться
          </Button>
        </Form>

        <Space direction={"vertical"} size={"large"}>
          <Typography.Text>
            Уже есть аккаунт? <Link to={"/register"}>Войдите</Link>
          </Typography.Text>
        </Space>
      </Card>
    </Row>
  );
};