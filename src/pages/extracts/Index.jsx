import React, { useState } from "react";
import Head from "../../components/commonds/Head";
import { Table, Tag } from "antd";

const Index = () => {
    const [tableView, setTableView] = useState();

    const getExtracts = async (status) => {
        const response = await axiosInstance.get("api/orders", {
          params: { status: status  },
        });
        setTableView(response.data.orders);
        setCount(response.data.total);
      };

    const columns = [
        {
          title: "Tarix",
          dataIndex: ["user", "name"],
          key: "name",
        },
        {
          title: "Çıxarışçı",
          dataIndex: "amount",
          key: "price",
          render: (text) => <a>{text}</a>,

        },
        {
          title: "Məbləğ",
          dataIndex: "paymentType",
          key: "payment",
          render: (text, obj) => <div>{text} ₼</div>,

        },
        {
          title: "Qalıq",
          dataIndex: "provider",
          key: "provayder",
        },
        {
          title: "Ödəniş növü",
          dataIndex: "paymentType",
          key: "paymentType",
        },
        {
          title: "Provayder",
          dataIndex: "provider",
          key: "provider",
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

      const handleStatusChange = (value) => {
        setSelectedStatus(value);
        getOrders(value);
      };

  return (
    <>
      <Head
        title={"Çıxarışlar"}
        count={3}
        select
        handleStatusChange={handleStatusChange}
      />
      <Table
        size="medium"
        columns={columns}
        dataSource={tableView}
        onRow={(record) => {
          return {
            onClick: () => handleOrderDetail(record),
          };
        }}
      />
    </>
  );
};

export default Index;
