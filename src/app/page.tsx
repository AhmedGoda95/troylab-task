"use client";

import Link from "next/link";

import CustomInput from "./components/CustomInput";
import CustomTable from "./components/CustomTable";
import { Alert, Button, Col, Row } from "antd";
import { useBookmarkContext } from "./context";

const Home = () => {
  const { results, error } = useBookmarkContext();

  return (
    <Row
      style={{
        justifyContent: "center",
      }}
    >
      <Col xs={24} md={18} xl={12}>
        <Button type="link">
          <Link href="/bookmarks">Show All Bookmarks</Link>
        </Button>
        <CustomInput />
        {error ? (
          <Alert message="Error" description={error} type="error" showIcon />
        ) : (
          <CustomTable results={results?.items ?? []} />
        )}
      </Col>
    </Row>
  );
};

export default Home;
