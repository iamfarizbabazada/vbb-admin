import React, { useState, useRef } from "react";
import { Modal, Input, Button, Row, Col } from "antd";
import Typography from "antd/es/typography/Typography";

const OtpModal = ({ isModalVisible, handleOk, handleCancel, email }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (isNaN(value)) return; 
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    const finalOtp = otp.join(""); 
    if (finalOtp.length === 4) {
      handleOk(finalOtp); 
    } else {
      alert("Lütfen 4 haneli OTP'yi girin.");
    }
  };

  return (
    <Modal
      title="OTP Doğrulama"
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <Row justify="center">
        <Col span={24}>
          <Typography.Text>{email} adresine gönderilen OTP kodunu girin:</Typography.Text>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: "20px" }}>
        {otp.map((_, index) => (
          <Input
            key={index}
            value={otp[index]}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyPress(e, index)}
            maxLength={1}
            style={{ width: "50px", marginRight: "10px", textAlign: "center" }}
            ref={(ref) => (inputRefs.current[index] = ref)}
            autoFocus={index === 0} 
          />
        ))}
      </Row>
      <Row justify="center" style={{ marginTop: "20px" }}>
        <Button type="primary" onClick={handleSubmit}>
          Onayla
        </Button>
      </Row>
    </Modal>
  );
};

export default OtpModal;
