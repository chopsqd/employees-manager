import React from "react";
import { Spin } from "antd";
import { useCurrentQuery } from "../store/services/auth";

interface IAuthProviderProps {
  children: JSX.Element;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const { isLoading } = useCurrentQuery();

  if (isLoading) {
    return <Spin />;
  }

  return children;
};