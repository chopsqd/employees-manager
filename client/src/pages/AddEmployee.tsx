import React, { useState } from "react";
import { Row } from "antd";
import { useNavigate } from "react-router-dom";
import { EmployeeForm } from "../components";
import useRequireAuth from "../hooks/useRequireAuth";
import { useAddEmployeeMutation } from "../store/services/employees";
import { EmployeeType } from "../types/user.types";
import { isErrorWithMessage } from "../utils/is-error-with-message";

export const AddEmployee = () => {
  useRequireAuth();

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [addEmployee] = useAddEmployeeMutation();

  const handleAddEmployee = async (data: EmployeeType) => {
    try {
      await addEmployee(data).unwrap();
      navigate("/status/created");
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
      <EmployeeForm
        title={"Добавить сотрудника"}
        btnText={"Добавить"}
        onFinish={handleAddEmployee}
        error={error}
      />
    </Row>
  );
};