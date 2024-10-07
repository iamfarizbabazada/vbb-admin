import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Image,
  Modal,
  Popconfirm,
  Popover,
  Row,
  Tooltip,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  MoreOutlined,
  UserDeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import style from "./style.module.scss";
import axiosInstance from "../../api/axiosInstace";
import Search from "antd/es/input/Search";
import UiCard from "../../components/commonds/UiCard";
import Head from "../../components/commonds/Head";

const Index = () => {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState();
  const [search, setSearch] = useState();
  const params = {};

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log("search", search);
  };

  if (search) {
    params.name = search;
  }
  const getUsersList = async () => {
    const response = await axiosInstance.get("api/users", {
      params,
    });
    setUsers(response.data.users);
    setCount(response.data.total);
  };

  const deleteUser = async (id) => {
    {
      try {
        const response = await axiosInstance.delete(`/api/users/${id}`);
        window.location.reload();
      } catch (error) {}
    }
  };

  const handleDeleteModal = (id) => {
    setUserId(id);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (userId) {
      deleteUser(userId);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getUsersList();
  }, [search]);

  return (
    <div>
      <Head title={'İstifadəçilərin'} count={count} handleSearch={handleSearch} search/>
      <Row className={style.users} gutter={12}>
        {users?.map((user) => (
          <Col span={6}>
            <UiCard  user={user} handleDeleteModal={handleDeleteModal} />
          </Col>
        ))}
      </Row>

      <Modal
        title="İstifadəçini silməkdən əminmisiniz?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Bəli"
        cancelText="Xeyir"
      ></Modal>
    </div>
  );
};

export default Index;
