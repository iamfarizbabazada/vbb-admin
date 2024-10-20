import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstace";
import {
  Button,
  Col,
  ConfigProvider,
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
import { CalendarOutlined, TagsOutlined } from "@ant-design/icons";

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
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: "#FFF",
            headerBg: "#FFF",
          },
        },
        token: {
          padding: 16,
        },
      }}
    >
      <Modal
        title="Depozit Məlumatları"
        open={open}
        okText="Təsdiqlə"
        loading={loading}
        width={450}
        cancelText="Bağla"
        className={style.modal}
        onOk={handleOk}
        footer={
          <Row className={style.modal_footer} gutter={24}>
            <Col span={12}>
              <Select
              ize="large"
                width="100%"
                height="100px"
                placeholder="Statusu dəyiş"
                onChange={handleStatusChange}
                style={{ marginBottom: "10px", width: "100%", height: '40px' }}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "PENDING",
                    label: "GÖZLƏYİR",
                  },
                  {
                    value: "COMPLETED",
                    label: "TƏSTİQLƏNDİ",
                  },
                  {
                    value: "REJECTED",
                    label: "LƏĞV EDİLDİ",
                  },
                ]}
              />
            </Col>
            <Col span={12}>
              <Button size="large" className={style.save_btn} color="default" variant="solid">Təsdiqlə</Button>
            </Col>
          </Row>
        }
        onCancel={handleCancel}
        afterOpenChange={afterOpenChange}
      >
        <Row className={style.user_info}>
          <Image width={120} height={120} preview></Image>
          <div className={style.right}>
            <p className={style.user_order_id}><TagsOutlined /> {order?.user?.id}</p>
            <h2>{order?.user?.name}</h2>
            <p>{order?.user?.email}</p>
            <p>
              <CalendarOutlined style={{marginRight: '5px'}}/>
              {formatDate(order?.createdAt)}
            </p>
            {order?.status === "PENDING" ? (
              <Tag color={"yellow"}>GÖZLƏYİR</Tag>
            ) : order?.status === "COMPLETED" ? (
              <Tag color={"yellow"}>TƏSTİQLƏNDİ</Tag>
            ) : order?.status === "REJECTED" ? (
              <Tag color={"yellow"}>LƏĞV EDİLDİ</Tag>
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
              <h4>Ödənİş növü</h4>
              <p>{order?.paymentType}</p>
            </Col>
            <Col className={style.box_card}>
              <h4>Depozİt</h4>
              <p>{order?.amount} ₼</p>
            </Col>
          </Row>
          <Row className={style.boxs_top}>
            <Col className={`${style.box_card} ${style.bg_transparent_box}`}>
              <h4>Bonus</h4>
              <p>5%</p>
            </Col>
            <Col className={`${style.box_card} ${style.bg_transparent_box}`}>
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
    </ConfigProvider>
  );
};

export default Detail;
