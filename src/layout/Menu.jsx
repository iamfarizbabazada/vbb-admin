import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Users from "../components/icons/Users";
import Notification from "../components/icons/Notification";
import Support from "../components/icons/Support";
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
    icon: <Users color={location.pathname === "/users" ? '#B8860B' : '#0000008a'} />,
    label: <span style={{marginLeft: '10px', color: location.pathname === "/users" ? "#B8860B" : "#0000008a" }}>İstifadəçilər</span>,
  },
  {
    key: "/orders",
    icon: <Notification color={location.pathname === "/orders" ? '#B8860B' : '#0000008a'} />,
    label: <span style={{marginLeft: '10px', color: location.pathname === "/orders" ? "#B8860B" : "#0000008a" }}>Sifarişlər</span>,
  },
  {
    key: "/live_support",
    icon: <Support color={location.pathname === "/live_support" ? '#B8860B' : '#0000008a'} />,
    label: <span style={{marginLeft: '10px', color: location.pathname === "/live_support" ? "#B8860B" : "#0000008a" }}>Canlı Dəstək</span>,
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
