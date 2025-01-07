import React from "react";
import { Layout as AntLayout } from "antd";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";

const layoutStyles = {
  width: "80%",
  margin: "0 auto",
  fontFamily: "'Poppins', sans-serif",
  backgroundColor: "#141414"
};

export const Layout = () => {
  return (
    <AntLayout style={layoutStyles}>
      <Header />

      <AntLayout.Content>
        <Outlet />
      </AntLayout.Content>
    </AntLayout>
  );
};