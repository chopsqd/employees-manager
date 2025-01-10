import React from "react";
import { Link, useParams } from "react-router-dom";
import { Result, Row } from "antd";

const STATUSES: Record<string, string> = {
  created: "Пользователь успешно создан",
  updated: "Пользователь успешно обновлён",
  deleted: "Пользователь успешно удалён"
};

export const ShowStatus = () => {
  const { status } = useParams();

  return (
    <Row align="middle" justify="center" style={{ width: "100%" }}>
      <Result
        status={status ? "success" : 404}
        title={status ? STATUSES[status] : "Не найдено"}
        extra={<Link to="/">На главную</Link>}
      />
    </Row>
  );
};