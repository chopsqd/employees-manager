import React from "react";
import { Button, Layout, Space, Typography } from "antd";
import { LoginOutlined, LogoutOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../store/slices/authSlice";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const onLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Layout.Header style={headerStyles}>
      <Space size={"middle"}>
        <TeamOutlined style={logoStyles} />
        <Link to={"/"}>
          <Typography.Title level={2}>Сотрудники</Typography.Title>
        </Link>
      </Space>

      {user ? (
        <Button
          icon={<LogoutOutlined />}
          onClick={onLogout}
        >
          Выйти
        </Button>
      ) : (
        <Space size={"middle"}>
          <Link to={"/register"}>
            <Button icon={<UserOutlined />}>Регистрация</Button>
          </Link>
          <Link to={"/login"}>
            <Button icon={<LoginOutlined />}>Войти</Button>
          </Link>
        </Space>
      )}
    </Layout.Header>
  );
};