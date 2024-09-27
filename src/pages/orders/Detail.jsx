import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstace";
import { Modal } from "antd";

const Detail = ({ uuid, open, setOpen }) => {
    const [order, setOrder] = useState()

    console.log('uuid', uuid);

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

  return (
    <Modal
      title="Basic Modal"
      open={open}
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
    </Modal>
  );
};

export default Detail;
