import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  Avatar,
  message,
  Image,
  Row,
  Popconfirm,
  Modal,
} from "antd";
import {
  UserOutlined,
  UploadOutlined,
  DeleteOutlined,
  MailOutlined,
} from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import style from "./style.module.scss";
import axiosInstance from "../../api/axiosInstace";

const Insert = ({setOpen, open}) => {
  const [form] = Form.useForm();

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
      patchAvatar()

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
  }, []);

  return (
    <Modal
    title={<div>Admin Əlavə Et</div>}
    open={open}
    onCancel={handleCancel}
    onOk={handleOk}
    footer={false}
    
  >
    <div className={style.insert_container}>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className={style.profile_form}
      >
        <Form.Item name="name">
          <Input
            size="large"
            placeholder="Adınız"
            prefix={<UserOutlined />}
          />
        </Form.Item>

        <Form.Item name="email">
          <Input
            size="large"
            placeholder="Email adresinizi girin"
            prefix={<MailOutlined />}
          />
        </Form.Item>

        <Form.Item name="password">
          <Input.Password size="large" placeholder="Şifrə" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            color="default"
            variant="solid"
            className={style.saveBtn}
            htmlType="submit"
          >
            Əlavə et
          </Button>
        </Form.Item>
      </Form>

    </div>
    </Modal>

  );
};

export default Insert;
