import { Col, Typography, Row, Image, Form, Input, Button, Checkbox } from "antd";
import React, { useState } from "react";
import style from "./style.module.scss";
import axiosInstance from "../../api/axiosInstace";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const navigate = useNavigate();

  const onRegisterFinish = async (values) => {
    try {
      const response = await axiosInstance.post("/api/auth/admin/login", {
        email: values.email,
        password: values.password,
      });

      navigate("/users");
    } catch (error) {
      console.error("Register Error:", error);
    }
  };

  const onFinishFailed = () => {
    console.log("cdscd");
  };

  return (
    <Row className={style.register}>
      <Col span={16} className={style.register_image}>
        <Image
          width={"100%"}
          height={"100%"}
          src="/register.png"
          preview={false}
        />
      </Col>
      <Col span={8} className={style.form_container}>
        <div style={{ width: "100%" }}>
          <Image src="/registerLogo.png" preview={false} />
          <Typography.Title>Xoş gəlmisiniz! 👋</Typography.Title>
          <Typography>Hesabınıza daxil olun və macəraya başlayın</Typography>
        </div>
        <Form
          name="basic"
          className={style.form}
          onFinish={onRegisterFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item name="email">
            <Input placeholder="Email və ya İstifadəçi adı" />
          </Form.Item>

          <Form.Item name="password">
            <Input.Password placeholder="Şifrə" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Məni xatırla</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              className={style.sumbit_btn}
              type="primary"
              htmlType="submit"
            >
              Daxil ol
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Register;
