import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstace";
import {
  Button,
  Col,
  Divider,
  Image,
  Input,
  Modal,
  Row,
  Select,
  Tag,
  Typography,
} from "antd";
import style from "./style.module.scss";
import { CalendarOutlined } from "@ant-design/icons";

const Detail = ({ uuid, open, setOpen }) => {
  const [user, setUser] = useState();

  const getUser = async () => {
    const response = await axiosInstance.get(`/api/users/${uuid}`);
    console.log("response", response.data);
    setUser(response.data);
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

  const patchStatus = async (value) => {
    // const response = await axiosInstance.patch('/api/')
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    patchStatus(value);
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
    <Modal
      title="İstifadəçi Məlumatları"
      open={open}
      okText="Təsdiqlə"
      loading={loading}
      width={450}
      cancelText="Bağla"
      className={style.modal}
      onOk={handleOk}
      footer={
        <Row gutter={12}>
          <Col span={12}>
            <Button danger className={style.delete_btn}>Hesabı Sil</Button>
          </Col>
          <Col span={12}>
            <Button className={style.save_btn}>Bağla</Button>
          </Col>
        </Row>
      }
      onCancel={handleCancel}
      afterOpenChange={afterOpenChange}
    >
      <Row className={style.user_info}>
        <Image width={150} height={150} preview></Image>
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
            <div className={style.user_info_box}>
              <h4>Bonus</h4>
              <p>bos</p>
            </div>
          </div>
        </div>
      </Row>
      <Row className={style.boxs_top}>
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
  );
};

export default Detail;
