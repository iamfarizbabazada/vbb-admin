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
  Table,
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
import Search from "antd/es/input/Search";
import UiCard from "../../components/commonds/UiCard";
import Head from "../../components/commonds/Head";
import Detail from "./Detail";

const Index = () => {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState();
  const [uuid, setUuid] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState();
  const params = {};

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log("search", search);
  };

  if (search) {
    params.name = search;
  }
  const getUsersList = async () => {
    const response = await axiosInstance.get("api/users", {
      params,
    });
    setUsers(response.data.users);
    setCount(response.data.total);
  };

 

  const handleDeleteModal = (id) => {
    setUserId(id);
    setIsModalOpen(true);
  };

  const handleUserDetail = (obj) => {
    setUuid(obj.id);
    setOpenModal(true);
  };


  const columns = [
    {
      title: "№",
      dataIndex: ["user", "name"],
      key: "name",
      render: (text, obj, index) => <a>{users.length - index}</a>,
    },
    {
      title: "Tarix",
      dataIndex: ["createdAt"],
      key: "createdAt",
      render: (createdAt) => {
        const date = new Date(createdAt);
        const formattedDate = date.toLocaleDateString("az-Latn-AZ", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        const formattedTime = date.toLocaleTimeString("az-Latn-AZ", {
          hour: "2-digit",
          minute: "2-digit",
        });
        return `${formattedDate} - ${formattedTime}`;
      },
    },
    {
      title: "Ad Soyad",
      dataIndex: ["name"],
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Günün Bonusu",
      dataIndex: ["bonus"],
      key: "name",
      render: (text) => <a>{text} ₼</a>,
    },
    {
      title: "Cari Balans",
      dataIndex: "currentBalance",
      key: "price",
      render: (text, obj) => <div>{text} ₼</div>,
    },
    {
      title: "Bütün Depozitlər",
      dataIndex: "totalDeposit",
      key: "payment",
      render: (text, obj) => <div >{text} ₼</div>,
    },
    {
      title: "Bütün Çıxarışlar",
      dataIndex: "totalWithdraw",
      key: "provayder",
      render: (text, obj) => <div >{text} ₼</div>,
    },
    {
      title: "Çıxarış Qalıqları Cəmi",
      dataIndex: "totalWithdrawResidual",
      key: "provayder",
      render: (text, obj) => <div >{text} ₼</div>,
    },
    // {
    //   title: "Statusu",
    //   dataIndex: "status",
    //   key: "status",
    //   render: (text, obj) => {
    //     return obj.status === "PENDING" ? (
    //       <Tag color={"yellow"}>GÖZLƏYİR</Tag>
    //     ) : obj.status === "COMPLETED" ? (
    //       <Tag color={"green"}>TƏSDİQLƏNDİ</Tag>
    //     ) : obj.status === "REJECTED" ? (
    //       <Tag color={"red"}>LƏĞV EDİLDİ</Tag>
    //     ) : (
    //       ""
    //     );
    //   },
    // },
  ];

  useEffect(() => {
    getUsersList();
  }, [search]);

  return (
    <div>
      <Head
        title={"İstifadəçilər"}
        count={count}
        handleSearch={handleSearch}
        search
      />

        <Table
          size="medium"
          columns={columns}
          dataSource={users}
          onRow={(record) => {
            return {
              onClick: () => handleUserDetail(record),
            };
          }}
        />

      <Detail uuid={uuid} open={openModal}  setOpen={setOpenModal}/>
    </div>
  );
};

export default Index;
