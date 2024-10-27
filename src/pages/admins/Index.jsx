import { Button, Form, Input, Modal, Row } from "antd";
import React, { useState, useEffect } from "react";
import Head from "../../components/commonds/Head";
import axiosInstance from "../../api/axiosInstace";
import style from "./style.module.scss";
import Insert from "./Insert";

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

  

  useEffect(() => {
    getAdmins();
  }, []);

  return (
    <div>
      <Head
        title="Adminlər"
        count={3}
        added
        handleNewModal={handleNewModal}
      />
      <Row className={style.admins} gutter={12}>
       
         <Insert setOpen={setOpen} open={open}  />
      </Row>
    </div>
  );
};

export default Index;
