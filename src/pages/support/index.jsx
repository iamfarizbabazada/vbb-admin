import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstace";
import { Col, Layout, Menu, Row } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Chat from "./Chat";
import style from "./style.module.scss";

const index = () => {
  const [users, setUsers] = useState([]);

  const getContacts = async () => {
    try {
      const response = await axiosInstance.get("/api/profile/contacts");
      console.log("Kullanıcı Verisi:", response.data); // Veriyi kontrol edin
      setUsers(response.data); 
    } catch (error) {
      console.error("Kişiler alınırken hata oluştu", error);
    }
  };

  const [receiverId, setReceiverId] = useState(null);

  const handleReceiverId = (id) => {
    setReceiverId(id);
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <Layout>
      <Row>
        <Col span={4} className={style.left}>
          {users.map((user) => (
            <div key={user.id} onClick={() => handleReceiverId(user.id)}>
              {user.name} {/* Kullanıcı adını render etme */}
            </div>
          ))}
        </Col>
        <Col span={20} className={style.right}>
          <Content>
            <Chat receiverId={receiverId} />
          </Content>
        </Col>
      </Row>
    </Layout>
  );
};

export default index;
