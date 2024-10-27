import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  List,
  notification,
  Row,
  Col,
  Typography,
  Image,
  Avatar,
} from "antd";
import socket from "./Socket";
import style from "./style.module.scss";
import { SendOutlined, UserOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

const Chat = ({ userId, receiverId, users, userData }) => {
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
      socket.off("chat new");
      socket.emit("leave room");
      socket.off();
    };
  }, [receiverId, users, message]);

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
        message: "Mesaj sahəsi boş ola bilməz.",
      });
    }
  };

  return (
    <div className={style.chat_container}>
      <Typography.Title level={4} className={style.chat_title}>
        {userData?.avatarURL ? (
          <Image className={style.message_img_head} src={userData?.avatarURL} />
        ) : (
          <Avatar style={{ width: "50px", height: "50px" }}>
            <UserOutlined style={{ fontSize: "30px" }} />
          </Avatar>
        )}
        {getUserNameById(receiverId)}
      </Typography.Title>
      <div className={style.message_all}>
        {messages
          .slice()
          .reverse()
          .map((message) => {
            const isUserMessage = message?.user?._id?.id === userId;
            const bgColor = isUserMessage
              ? style.userMessage
              : style.adminMessage;
            return (
              <>
                <div
                  key={message._id}
                  className={`${style.message_item} ${bgColor}`}
                >
                  <div className={style.message_text}>
                    {message?.text}
                    <span>
                      {new Date(message?.createdAt).toLocaleTimeString(
                        "tr-TR",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </span>
                  </div>
                </div>
              </>
            );
          })}
      </div>

      <Row className={style.chat_footer} >
          <Input
            value={message}
            size="large"
            onChange={(e) => setMessage(e.target.value)}
            onPressEnter={sendMessage}
            placeholder="Yazmağa başlayın.."
            className={style.message_input}
          />
          <Button
            type="primary"
            className={style.send_btn}
            onClick={sendMessage}
            icon={<SendOutlined style={{ fontSize: "26px" }} />}
          ></Button>
      </Row>
    </div>
  );
};

export default Chat;
