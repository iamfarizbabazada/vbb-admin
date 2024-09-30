import { Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import Edit from "../../components/icons/Edit";
import axiosInstance from "../../api/axiosInstace";
import Detail from "./Detail";



const Index = () => {
  const [tableView, setTableView] = useState();
  const [selectedStatus, setSelectedStatus] = useState()
  const [uuid, setUuid] = useState()

  const [openModal, setOpenModal] = useState(false)


  const getOrders = async (status) => {
    const response = await axiosInstance.get("api/orders", {
        params: { status: status || undefined },
      });

    setTableView(response.data.orders);
  };
  
  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    getOrders(value); 
  }

  const handleOrderDetail = (obj) => {
    setUuid(obj.id)
    setOpenModal(true)
  }

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
    },
    {
      title: "Ətraflı",
      dataIndex: "detail",
      key: "detail",
      render: (text, obj) => (
        <a onClick={() => handleOrderDetail(obj)}>
          <Edit />
        </a>
      ),
    },
  ];

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <Select
        placeholder="Status seçin"
        onChange={handleStatusChange}
        style={{marginBottom: '10px'}}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={[
          {
            value: "PENDING",
            label: "PENDING",
          },
          {
            value: "COMPLETED",
            label: "COMPLETED",
          },
          {
            value: "REJECTED",
            label: "REJECTED",
          },
        ]}
      />
      <Table columns={columns} dataSource={tableView} />

      <Detail uuid={uuid} open={openModal} setOpen={setOpenModal} />
    </>
  );
};

export default Index;
