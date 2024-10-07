import { UserDeleteOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Image, Row, Tooltip } from "antd";
import React from "react";
import style from './style.module.scss'

const UiCard = ({user, handleDeleteModal}) => {


  
  return (
    <Card style={{ width: "100%", height: "100px", marginBottom: "10px" }}>
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
  );
};

export default UiCard;
