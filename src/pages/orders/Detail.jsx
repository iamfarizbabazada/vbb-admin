import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstace";
import { Modal, Select } from "antd";

const Detail = ({ uuid, open, setOpen }) => {
    const [order, setOrder] = useState()


  const getOrder = async () => {
    const response = await axiosInstance.get(`/api/orders/${uuid}`);
    console.log("response", response.data);
    setOrder(response.data)
  };

  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const afterOpenChange = () => {
    getOrder()
  }

  const patchStatus = async(value) => {
    // const response = await axiosInstance.patch('/api/')
  }

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    patchStatus(value);
  };

  const [loading, setLoading] = React.useState(true);

  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    showLoading()
  }, [])

  return (
    <Modal
      title="Sifariş Məlumatları"
      open={open}
      okText="Təsdiqlə"
      loading={loading}
      cancelText="Bağla"
      onOk={handleOk} onCancel={handleCancel}
      afterOpenChange={afterOpenChange}
    >

     <h1>
        Sifarişçi: {order?.user.name}
     </h1>
     <p>
        Email: {order?.user.email}
     </p>
   
     <p>
        Ödəniş Növü: {order?.paymentType}
     </p>
     <p>
        Provider: {order?.provider}
     </p>
     <p>
        Statusu: {order?.status}
     </p>
     <p>
        Məbləğ: {order?.amount} ₼
     </p>
     <Select
        placeholder="Status seçin"
        onChange={handleStatusChange}
        style={{ marginBottom: "10px", width: "200px" }}
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
    </Modal>
  );
};

export default Detail;
