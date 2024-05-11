"use client";

import React from "react";
import CustomTable from "../components/CustomTable";
import { Col, Row } from "antd";
import { useBookmarkContext } from "../context";

const Bookmarks = () => {
  const { bookmarks } = useBookmarkContext();

  return (
    <Row
      style={{
        justifyContent: "center",
      }}
    >
      <Col xs={24} md={18} lg={12}>
        <CustomTable results={bookmarks} />
      </Col>
    </Row>
  );
};

export default Bookmarks;
