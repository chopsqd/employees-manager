import React from "react";
import { Button, Layout, Space, Typography } from "antd";
import { LoginOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const headerStyles = {
  padding: "20px",
  display: "flex",
  background: "transparent",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "20px"
};

const logoStyles = {
  fontSize: "26px"
};

export const Header = () => {
  return (
    <Layout.Header style={headerStyles}>
      <Space size={"middle"}>
        <TeamOutlined style={logoStyles} />
        <Link to={"/"}>
          <Typography.Title level={2}>Сотрудники</Typography.Title>
        </Link>
      </Space>

      <Space size={"middle"}>
        <Link to={"/register"}>
          <Button icon={<UserOutlined />}>Регистрация</Button>
        </Link>
        <Link to={"/login"}>
          <Button icon={<LoginOutlined />}>Войти</Button>
        </Link>
      </Space>
    </Layout.Header>
  );
};