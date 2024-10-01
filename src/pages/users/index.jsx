import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Image,
  Modal,
  Popconfirm,
  Popover,
  Row,
  Tooltip,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  MoreOutlined,
  UserDeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import style from "./style.module.scss";
import axiosInstance from "../../api/axiosInstace";

const Index = () => {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState();

  const getUsersList = async () => {
    const response = await axiosInstance.get("api/users");
    setUsers(response.data.users);

  };

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <div>
      <Row className={style.count_section}>
        <Typography level={2} style={{ margin: "0px" }}>
        İstifadəçi sayı: <Badge count={count} showZero color="#B8860B" />
        </Typography>
      </Row>
      <Row className={style.users} gutter={12}>
        {users?.map((user) => (
          <Col span={6}>
            <Card style={{ width: "100%", height: '100px', marginBottom: '10px' }}>
              <Row gutter={12} className={style.user_content}>
                <div className={"flex items-center"}>
                  <Col>
                    {user.avatarURL ? (
                      <Image
                        width={50}
                        className={style.user_img}
                        preview={true}
                        src={user.avatarURL}
                      />
                    ) : (
                      <Avatar size={50} icon={<UserOutlined />} />
                    )}
                  </Col>
                  <Col>
                    <Tooltip title={user.name}>
                      <h2 className={style.truncate}>
                        {user.name.length > 24
                          ? `${user.name.slice(0, 24)}...`
                          : user.name}
                      </h2>
                    </Tooltip>
                    <Tooltip title={user.email}>
                      <p className={style.truncate}>
                        {" "}
                        {user.email.length > 24
                          ? `${user.email.slice(0, 24)}...`
                          : user.email}
                      </p>
                    </Tooltip>
                  </Col>
                </div>
                <Col className={style.user_edit}>
                  <UserDeleteOutlined
                    onClick={() => handleDeleteModal(user.id)}
                    style={{ fontSize: "20px", color: "#e37f7f" }}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title="İstifadəçini silməkdən əminmisiniz?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Bəli"
        cancelText="Xeyir"
      ></Modal>
    </div>
  );
};

export default Index;
