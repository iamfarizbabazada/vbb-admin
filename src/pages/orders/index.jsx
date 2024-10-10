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
  const [search, setSearch] = useState();
  const [count, setCount] = useState()
  const [openModal, setOpenModal] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log("search", search);
  };

  const getOrders = async (status) => {
    const response = await axiosInstance.get("api/orders", {
      params: { status: status, search: search  },
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
      title: "№",
      dataIndex: ["user", "name"],
      key: "name",
      render: (text, obj, index) => <a>{tableView.length - index}</a>,
    },
    {
      title: "Tarix",
      dataIndex: "createdAt",
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
      render: (text, obj) => <div className="text-[#b8860b]">{text}</div>,
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
  }, [selectedStatus, search]);

  return (
    <>
      <Head title={'Sifarişlərin'} handleSearch={handleSearch} count={count} select search handleStatusChange={handleStatusChange}/>
      <Table size="medium" columns={columns} dataSource={tableView} onRow={(record) => {
          return {
            onClick: () => handleOrderDetail(record), 
          };
        }}/>

      <Detail uuid={uuid} open={openModal}  setOpen={setOpenModal}/>
    </>
  );
};

export default Index;
