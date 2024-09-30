import { Avatar, Card, Col, Image, Row } from "antd";
import React, { useEffect, useState } from "react";
import { UserOutlined } from '@ant-design/icons';
import style from "./style.module.scss";
import axiosInstance from "../../api/axiosInstace";

const Index = () => {
  const [users, setUsers] = useState([]);

  const getUsersList = async () => {
    const response = await axiosInstance.get("api/users");
    setUsers(response.data.orders);
  };

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <div>
      <Row className={style.users}>
        {users.map((user) => (
          <Card
            style={{
              width: 300,
            }}
          >
            <Row gutter={12} className={style.user_content}>
              <Col>
                {user.avatarURL ? (
                    <Image
                      width={50}
                      preview={false}
                      src={user.avatarURL}
                    />
                ): (
                    <Avatar size={64} icon={<UserOutlined />} />
                )}
              </Col>
              <Col>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
              </Col>
            </Row>
          </Card>
        ))}
      </Row>
    </div>
  );
};

export default Index;
