import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Spin } from "antd";
import { useEditEmployeeMutation, useGetEmployeeQuery } from "../store/services/employees";
import { EmployeeForm } from "../components";
import { EmployeeType } from "../types/user.types";
import { isErrorWithMessage } from "../utils/is-error-with-message";

export const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { data, isLoading } = useGetEmployeeQuery(id || "");
  const [editEmployee] = useEditEmployeeMutation();

  if (isLoading) {
    return <Spin />;
  }

  const handleEditUser = async (employee: EmployeeType) => {
    try {
      const editedEmployee = { ...data, ...employee };

      await editEmployee(editedEmployee).unwrap();
      navigate("/status/updated");
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
        title="Редактировать сотрудника"
        btnText="Редактировать"
        onFinish={handleEditUser}
        employee={data}
        error={error}
      />
    </Row>
  );
};
