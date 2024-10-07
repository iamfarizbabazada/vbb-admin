import { Button, Form, Input, Modal, Row } from "antd";
import React, { useState, useEffect } from "react";
import Head from "../../components/commonds/Head";
import axiosInstance from "../../api/axiosInstace";
import style from "./style.module.scss";

const Index = () => {
  const [open, setOpen] = useState(false);

  const getAdmins = async () => {
    try {
      const response = await axiosInstance.get("/api/users", {
        params: {
          name: "ADMIN",
        },
      });
      console.log("admin", response);
    } catch (error) {}
  };

  const handleNewModal = () => {
    setOpen(true);
  };

  const onFinish = async (values) => {
    try {
      const response = await axiosInstance.post("/api/users", {
        user: {
          name: values.name,
          email: values.email,
          role: "ADMIN",
        },
        password: values.password,
      });

      setOpen(false)

      console.log("respinse", response);
    } catch (error) {}
  };

  const handleOk = () => {
    onFinish();
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    getAdmins();
  }, []);

  return (
    <div>
      <Head
        title="Adminlərin"
        count={3}
        added
        handleNewModal={handleNewModal}
      />
      <Row className={style.admins} gutter={12}>
        <Modal
          title={<div>Məlumatları Yenilə</div>}
          open={open}
        >
          <Form onFinish={onFinish}>
            <Form.Item label="Ad Soyad" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Yeni şifrə təkrarı" name="newPassord">
              <Input />
            </Form.Item>
            <Form.Item label="Yeni şifrə təkrarı" name="password">
              <Input />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </Modal>
      </Row>
    </div>
  );
};

export default Index;
