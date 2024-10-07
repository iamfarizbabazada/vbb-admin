import { Badge, Button, Col, Row, Select, Typography } from "antd";
import Search from "antd/es/input/Search";
import React, { useState } from "react";
import style from "./style.module.scss";
import { PlusOutlined } from "@ant-design/icons";

const Head = ({ search, title, count, select, added, handleSearch, handleStatusChange, handleNewModal }) => {
    console.log('count', count);
  return (
    <Row className={style.head}>
      <Col span={12}>
        <Typography level={2} style={{ margin: "0px" }}>
          {title} sayı: <Badge count={count} showZero color="#B8860B" />
        </Typography>
      </Col>
      <Col span={11} className="flex justify-end items-end">
        {search && (
          <Search
            placeholder="Axtarış"
            onChange={handleSearch}
            style={{
              width: 200,
            }}
          />
        )}
        {select && (
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
        )}
        {added && (
            <Button onClick={() => handleNewModal()} icon={<PlusOutlined />}>

            </Button>
        )}
      </Col>
    </Row>
  );
};

export default Head;
