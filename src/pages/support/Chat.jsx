import React, { useEffect, useState } from "react";
import { Input, Button, List, notification, Row, Col, Typography } from "antd";
import socket from "./Socket";
import style from "./style.module.scss";

const Chat = ({ userId, receiverId, users }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const getUserNameById = (id) => {
    const user = users.find((user) => user.id === id);
    return user ? user.name : "Admin"; 
  };

  useEffect(() => {
    socket.emit("join room", receiverId);

    socket.on("chat new", (newMessage) => {
      setMessages((previousMessages) => [...previousMessages, newMessage]);
    });

    socket.on("messages", (chatMessages) => {
      const formattedMessages = chatMessages.map((msg) => {
        console.log("Received Message:", msg); 
        return {
          _id: msg._id,
          text: msg.text,
          createdAt: msg.createdAt,
          isReaded: msg.read,
          user: {
            _id: msg.sender,
            name: getUserNameById(msg.sender), 
          },
        };
      });
      setMessages(formattedMessages);
    });

    socket.emit("chat history");

    return () => {
      socket.emit("leave room");
      socket.off();
    };
  }, [receiverId, users]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("chat message", message);
      const newMessage = {
        _id: Math.random().toString(36).substring(7), 
        text: message,
        createdAt: new Date(),
        user: {
          _id: userId, 
          name: getUserNameById(userId), 
        },
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage(""); 
    } else {
      notification.error({
        message: "Mesaj boş olamaz.",
      });
    }
  };

  return (
    <div className={style.chat_container}>
      <Typography.Title level={4}>{getUserNameById(receiverId)}</Typography.Title>
      <List
        className={style.messages_content}
        dataSource={messages}
        renderItem={(msg) => (
          <List.Item key={msg._id}>
            <strong>{msg?.user?.name}: </strong> {msg.text}{" "}
          </List.Item>
        )}
      />
      <Row className={style.chat_footer} gutter={12}>
        <Col span={20}>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onPressEnter={sendMessage}
            placeholder="Yazın..."
          />
        </Col>
        <Col span={4}>
          <Button
            type="primary"
            className={style.send_btn}
            onClick={sendMessage}
          >
            Göndər
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Chat;
