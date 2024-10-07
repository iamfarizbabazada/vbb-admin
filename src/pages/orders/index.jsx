import { Badge, Select, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import Edit from "../../components/icons/Edit";
import axiosInstance from "../../api/axiosInstace";
import Detail from "./Detail";
import Head from "../../components/commonds/Head";



const Index = () => {
  const [tableView, setTableView] = useState();
  const [selectedStatus, setSelectedStatus] = useState();
  const [uuid, setUuid] = useState();
  const [count, setCount] = useState()

  const [openModal, setOpenModal] = useState(false);

  const getOrders = async (status) => {
    const response = await axiosInstance.get("api/orders", {
      params: { status: status  },
    });
    setTableView(response.data.orders);
    setCount(response.data.total);
  };


  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    getOrders(value);
  };

  const handleOrderDetail = (obj) => {
    setUuid(obj.id);
    setOpenModal(true);
  };


  const columns = [
    {
      title: "Sifarişçi",
      dataIndex: ["user", "name"],
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Məbləğ",
      dataIndex: "amount",
      key: "price",
      render: (text, obj) => <div>{text} ₼</div>,
    },
    {
      title: "Ödəniş üsulu",
      dataIndex: "paymentType",
      key: "payment",
    },
    {
      title: "Provayder",
      dataIndex: "provider",
      key: "provayder",
    },
    {
      title: "Statusu",
      dataIndex: "status",
      key: "status",
      render: (text, obj) => {
        return obj.status === "PENDING" ? (
          <Tag color={"yellow"}>GÖZLƏYİR</Tag>
        ) : obj.status === "COMPLETED" ? (
          <Tag color={"green"}>TƏSDİQLƏNDİ</Tag>
        ) : obj.status === "REJECTED" ? (
          <Tag color={"red"}>LƏĞV EDİLDİ</Tag>
        ) : '';
      },
    },
  ];

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <Head title={'Sifarişlərin'} count={count} select handleStatusChange={handleStatusChange}/>
      <Table columns={columns} dataSource={tableView} onRow={(record) => {
          return {
            onClick: () => handleOrderDetail(record), 
          };
        }}/>

      <Detail uuid={uuid} open={openModal}  setOpen={setOpenModal}/>
    </>
  );
};

export default Index;
