import React, { useMemo } from "react";
import { Header } from "antd/es/layout/layout";
import { Col, Image, Popover, Row } from "antd";
import style from "./style.module.scss";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstace";

const HeaderComp = () => {
  const navigate = useNavigate();

  const translationMap = {
    users: "İstifadəçilər",
    orders: "Sifarişlər",
    live_support: "Canlı Dəstək",
  };

  const activePage = window.location.pathname.split("/")[1];

  const activePageTranslated = useMemo(() => {
    return translationMap[activePage] || activePage;
  },[activePage])

  const handleLogout = async() => {
    try {
        await axiosInstance.post('/api/auth/logout')
        navigate('/')
    } catch (error) {
        console.error(error)
    }
  }

  const content = (
    <div className={style.user_dropdown}>
      <Link to='/profile'>Tənzimləmələr</Link>
      <Link onClick={handleLogout}>Log out</Link>
    </div>
  );

  return (
    <Header className="header">
      <Row className="header_content">
        <Col span={12} className="title">
          {activePageTranslated}
        </Col>
        <Col span={12} className="account">
          <Popover placement="leftBottom" content={content}>
            <Image
              src="/image.jpeg"
              width={38}
              height={38}
              className={style.account_image}
              preview={false}
            />
          </Popover>
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderComp;
