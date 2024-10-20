import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstace";
import {
  Button,
  Col,
  ConfigProvider,
  Divider,
  Image,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Tag,
  Typography,
} from "antd";
import style from "./style.module.scss";
import { CalendarOutlined, DeleteOutlined } from "@ant-design/icons";

const Detail = ({ uuid, open, setOpen }) => {
  const [user, setUser] = useState();

  const getUser = async () => {
    const response = await axiosInstance.get(`/api/users/${uuid}`);
    console.log("response", response.data);
    setUser(response.data);
  };

  const confirmDelete = async () => {
    {
      try {
        const response = await axiosInstance.delete(`/api/users/${uuid}`);
        message.success("Click on Yes");
        window.location.reload();
      } catch (error) {}
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short", // Oct gibi ay ismi verir
    });
    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate},${formattedTime}`;
  };

  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const afterOpenChange = () => {
    getUser();
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
  };

  const [loading, setLoading] = React.useState(true);

  const showLoading = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    showLoading();
  }, []);

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: "#F0F2F5",
            headerBg: "#FFF",
          },
        },
        token: {
          padding: 16,
        },
      }}
    >
      <Modal
        title="İstifadəçi Məlumatları"
        open={open}
        okText="Təsdiqlə"
        loading={loading}
        width={450}
        cancelText="Bağla"
        className={style.modal}
        onOk={handleOk}
        onClose={handleOk}
        footer={
          <Row gutter={12} className={style.modal_footer}>
            <Col span={12}>
              <Popconfirm
                title="İstifadəçini Silmək İstəyirsinizmi?"
                onConfirm={() => confirmDelete()}
                okText="Bəli"
                cancelText="Xeyir"
                okButtonProps={{
                  type: "primary",
                  color: "default",
                  variant: "solid",
                }}
                cancelButtonProps={{ color: "default", variant: "text" }}
              >
                <Button
                  danger
                  onClick={() => deleteUser()}
                  className={style.delete_btn}
                  icon={<DeleteOutlined />}
                  size="large"
                >
                  Hesabı Sil
                </Button>
              </Popconfirm>
            </Col>
            <Col span={12}>
              <Button
                className={style.save_btn}
                color="default"
                variant="solid"
                onClick={handleOk}
                size="large"
              >
                Bağla
              </Button>
            </Col>
          </Row>
        }
        onCancel={handleCancel}
        afterOpenChange={afterOpenChange}
      >
        <div className={style.user_info}>
          <div className={style.left}>
            <Image width={"100%"} height={"100%"} preview></Image>
          </div>
          <div className={style.right}>
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
            <p className={style.date}>
              <span>Qeydiyyat: </span>
              {formatDate(user?.createdAt)}
            </p>
            <div className={style.user_info_boxs}>
              <div className={style.user_info_box}>
                <h4>Balans</h4>
                <p>bos</p>
              </div>
              <div className={style.user_info_box}>
                <h4>Bonus</h4>
                <p>bos</p>
              </div>
            </div>
          </div>
        </div>
        <Row className={style.user_info_footer}>
          <Col className={style.box_card}>
            <h4>Bütün Depozitlər</h4>
            <p>bos</p>
          </Col>
          <Col className={style.box_card}>
            <h4>Bütün Çıxarışlar</h4>
            <p>bos</p>
          </Col>
          <Col className={style.box_card}>
            <h4>Çıxarış Qalıqları</h4>
            <p>bos</p>
          </Col>
        </Row>
      </Modal>
    </ConfigProvider>
  );
};

export default Detail;
