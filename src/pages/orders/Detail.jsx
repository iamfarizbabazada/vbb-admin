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
  const [order, setOrder] = useState();
  const getOrder = async () => {
    const response = await axiosInstance.get(`/api/orders/${uuid}`);
    console.log("response", response.data);
    setOrder(response.data);
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
    getOrder();
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
      title="Sifariş Məlumatları"
      open={open}
      okText="Təsdiqlə"
      loading={loading}
      width={450}
      cancelText="Bağla"
      className={style.modal}
      onOk={handleOk}
      footer={
        <Row>
          <Col span={12}>
            <Select
            width="100%"
              placeholder="Statusu dəyiş"
              onChange={handleStatusChange}
              style={{ marginBottom: "10px", width: "200px" }}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: "PENDING",
                  label: "PENDING",
                },
                {
                  value: "COMPLETED",
                  label: "COMPLETED",
                },
                {
                  value: "REJECTED",
                  label: "REJECTED",
                },
              ]}
            />
          </Col>
          <Col span={12}>
              <Button>
                Təsdiqlə
              </Button>
          </Col>
        </Row>
      }
      onCancel={handleCancel}
      afterOpenChange={afterOpenChange}
    >
      <Row className={style.user_info}>
        <Image width={100} height={100} preview></Image>
        <div className={style.right}>
          <h2>{order?.user.name}</h2>
          <p>{order?.user.email}</p>
          <p>
            <CalendarOutlined />
            {formatDate(order?.createdAt)}
          </p>
          {order?.status === "PENDING" ? (
            <Tag color={"yellow"}>GÖZLƏYİR</Tag>
          ) : order?.status === "COMPLETED" ? (
            <Tag color={"yellow"}>GÖZLƏYİR</Tag>
          ) : order?.status === "REJECTED" ? (
            <Tag color={"yellow"}>GÖZLƏYİR</Tag>
          ) : (
            ""
          )}
        </div>
      </Row>
      <div className={style.depozit_info}>
        <Row className={style.boxs_top}>
          <Col className={style.box_card}>
            <h4>Provayder</h4>
            <p>{order?.provider}</p>
          </Col>
          <Col className={style.box_card}>
            <h4>Ödəniş növü</h4>
            <p>{order?.paymentType}</p>
          </Col>
          <Col className={style.box_card}>
            <h4>Depozit</h4>
            <p>{order?.amount} ₼</p>
          </Col>
        </Row>
        <Row className={style.boxs_top}>
          <Col className={style.box_card}>
            <h4>Bonus</h4>
            <p>5%</p>
          </Col>
          <Col className={style.box_card}>
            <h4>KÖÇÜRÜLDÜ</h4>
            <Input size="small" />
          </Col>
          <Col className={style.box_card}>
            <h4>YEKUN</h4>
            <p>{order?.amount} ₼</p>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default Detail;
