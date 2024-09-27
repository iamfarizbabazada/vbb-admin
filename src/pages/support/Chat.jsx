// src/Chat.js
import React, { useEffect, useState } from "react";
import { Input, Button, List, notification, Row } from "antd";
import socket from "./Socket";
import style from "./style.module.scss";

const Chat = ({ userId, receiverId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("join room", receiverId);
  
    const handleMessages = (history) => {
      setMessages(history);
    };
  
    const handleNewMessage = (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };
  
    socket.on("messages", handleMessages);
    socket.on("chat new", handleNewMessage);
  
    return () => {
      socket.off("messages", handleMessages); // Dinleyiciyi kaldır
      socket.off("chat new", handleNewMessage); // Dinleyiciyi kaldır
      socket.emit("leave room");
    };
  }, [receiverId]);
  

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("chat message", message);
      setMessage("");
    } else {
      notification.error({
        message: "Message cannot be empty or receiver not selected",
      });
    }
  };

  return (
    <div>
      <h2>Chat with {receiverId}</h2>
      <List
        className={style.messages_content}
        dataSource={messages}
        renderItem={(msg) => (
          <List.Item key={msg._id}>
            {" "}
            <strong>{msg.sender.name}: </strong> {msg.text}{" "}
          </List.Item>
        )}
      />
      <Row className={style.chart_footer}>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onPressEnter={sendMessage}
          placeholder="Type a message"
        />
        <Button type="primary" className={style.send_btn} onClick={sendMessage}>
          Göndər
        </Button>
      </Row>
    </div>
  );
};

export default Chat;
