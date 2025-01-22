import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Alert, Button, Descriptions, Divider, Modal, Row, Space, Spin, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useGetEmployeeQuery, useRemoveEmployeeMutation } from "../store/services/employees";
import { selectUser } from "../store/slices/authSlice";
import { isErrorWithMessage } from "../utils/is-error-with-message";

export const EmployeeInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useGetEmployeeQuery(id || "");
  const [removeEmployee] = useRemoveEmployeeMutation();

  if (isLoading) {
    return <Spin />;
  }

  if (!data) {
    return (
      <Row align={"middle"} justify={"center"}>
        <Typography.Title level={4}>Пользователь не найден</Typography.Title>
      </Row>
    );
  }

  const showModal = () => setIsModalOpen(true);
  const hideModal = () => setIsModalOpen(false);

  const handleDeleteUser = async () => {
    hideModal();

    try {
      await removeEmployee(data.id).unwrap();
      navigate("/status/deleted");
    } catch (err) {
      if (isErrorWithMessage(err)) {
        setError(err.data.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };

  return (
    <>
      <Descriptions title={"Информация о сотруднике"} bordered>
        <Descriptions.Item label={"Имя"} span={3}>
          {data.firstName} {data.lastName}
        </Descriptions.Item>
        <Descriptions.Item label={"Возраст"} span={3}>
          {data.age}
        </Descriptions.Item>
        <Descriptions.Item label={"Адрес"} span={3}>
          {data.address}
        </Descriptions.Item>
      </Descriptions>

      {user?.id === data.userId && (
        <>
          <Divider orientation={"left"}>Действия</Divider>
          <Space>
            <Link to={`/employee/edit/${data.id}`}>
              <Button
                shape={"round"}
                type={"default"}
                icon={<EditOutlined />}
              >
                Редактировать
              </Button>
            </Link>
            <Button
              shape={"round"}
              danger
              icon={<DeleteOutlined />}
              onClick={showModal}
            >
              Удалить
            </Button>
          </Space>
        </>
      )}

      {error && <Alert message={error} type="error" />}

      <Modal
        title="Подтвердите удаление"
        open={isModalOpen}
        onOk={handleDeleteUser}
        onCancel={hideModal}
        okText="Подтвердить"
        cancelText="Отменить"
      >
        Вы действительно хотите удалить сотрудника из таблицы?
      </Modal>
    </>
  );
};