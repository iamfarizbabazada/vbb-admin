import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstace";
import { Avatar, Col, Image, Layout, List, Row, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import Chat from "./Chat";
import style from "./style.module.scss";

const Index = () => {
  const [users, setUsers] = useState([]);
  const [receiverId, setReceiverId] = useState(null);

  const [userData, setUserData] = useState()

  console.log("users", users);

  // Kullanıcıları API'den almak
  const getContacts = async () => {
    try {
      const response = await axiosInstance.get("/api/profile/contacts");
      console.log("Kullanıcı Verisi:", response.data);
      setUsers(response.data);
      if (response.data.length > 0) {
        setReceiverId(response.data[0].id);
      }
    } catch (error) {
      console.error("Kişiler alınırken hata oluştu", error);
    }
  };

  // Alıcı ID'sini ayarlama
  const handleReceiverId = (user) => {
    setReceiverId(user.id);
    setUserData(user)

  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <Layout>
      <Row>
        <Col span={3}>
        </Col>
        <Col span={5} className={style.left}>
          <Typography.Title level={5}>Mesajlar</Typography.Title>

          <List
            itemLayout="horizontal"
            dataSource={users}
            className={style.users}
            renderItem={(user) => (
              <List.Item
                key={user.id}
                onClick={() => handleReceiverId(user)}
                className={`${style.user} ${receiverId === user.id ? style.selectedUser : ''}`} 
                style={{ cursor: "pointer" }} // Tıklanabilir görünüm için
              >
                <List.Item.Meta
                className={style.user_name}
                  avatar={
                    user?.avatarURL ? (
                      <Avatar src={user.avatarURL} />
                    ) : (
                      <Avatar icon={<UserOutlined />} />
                    )
                  }
                  title={user.name}
                />
              </List.Item>
            )}
          />
        </Col>
        <Col span={14} className={style.right}>
          <Content>
            <Chat userData={userData} receiverId={receiverId} userId={receiverId} users={users} />
          </Content>
        </Col>
        <Col span={2}>
        </Col>
      </Row>
    </Layout>
  );
};

export default Index;
