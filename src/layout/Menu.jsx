import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Users from "../components/icons/users";
import Notification from "../components/icons/notification";
import Support from "../components/icons/support";
import { Button, Flex, Menu } from "antd";
import Logo from '../components/icons/Logo';
import style from './style.module.scss';

const MenuComp = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); 
  const location = useLocation(); 

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (e) => {
    navigate(e.key); 
    console.log(e);
  };

  const items = [
    {
      key: "/users",
      icon: <Users color={location.pathname === "/users" ? '#C3C2C1' : '#B8860B'} />,
      label: "İstifadəçilər",
    },
    {
      key: "/orders",
      icon: <Notification color={location.pathname === "/orders" ? '#C3C2C1' : '#B8860B'} />,
      label: "Sifarişlər",
    },
    {
      key: "/live_support",
      icon: <Support color={location.pathname === "/live_support" ? '#C3C2C1' : '#B8860B'} />,
      label: "Canlı Dəstək",
    },
  ];

  return (
    <div>
      <Flex align="center" justify="center">
        <div className="logo">
          <Logo />
        </div>
      </Flex>
      <Menu
        defaultSelectedKeys={[location.pathname]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
        className={style.menu}
        onClick={handleMenuClick} 
      />
    </div>
  );
};

export default MenuComp;
