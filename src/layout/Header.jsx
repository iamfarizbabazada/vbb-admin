import React, { useMemo } from "react";
import { Header } from "antd/es/layout/layout";
import { Col, Image, Popover, Row } from "antd";
import style from "./style.module.scss";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstace";
import { useSelector } from "react-redux";

const HeaderComp = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user)

  const translationMap = {
    users: "İstifadəçilər",
    orders: "Sifarişlər",
    live_support: "Canlı Dəstək",
    profile: "Hesabım",
  };

  const activePage = window.location.pathname.split("/")[1];

  const activePageTranslated = useMemo(() => {
    return translationMap[activePage] || activePage;
  },[activePage])

const handleLogout = async () => {
  try {
    await axiosInstance.post('/api/auth/logout');

    localStorage.removeItem('user');

    document.cookie.split(';').forEach((cookie) => {
      const cookieName = cookie.split('=')[0].trim();
      document.cookie = `${cookieName}=; Max-Age=0; path=/;`;
    });

    navigate('/');
  } catch (error) {
    console.error("Logout Error:", error);
  }
};


  const content = (
    <div className={style.user_dropdown}>
      <Link to='/profile'>Hesabım</Link>
      <Link onClick={handleLogout}>Çıxış et</Link>
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
              src={user?.avatarURL}
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
