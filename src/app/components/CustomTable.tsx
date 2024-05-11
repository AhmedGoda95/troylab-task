import { Button, Table } from "antd";
import React from "react";
import { useBookmarkContext } from "../context";

const CustomTable: React.FC<{
  results: Record<string, any>[];
}> = ({ results = [] }) => {
  const { onHandleBookmark } = useBookmarkContext();

  const columns = [
    {
      title: "Repository Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Repository Owner",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: "Repository Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Number of Starts",
      dataIndex: "stargazers_count",
      key: "stargazers_count",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "address",
      render(_text: string, record: Record<string, any>) {
        return <Button onClick={() => handleBookmark(record)}>Bookmark</Button>;
      },
    },
  ];

  const handleBookmark = (record: Record<string, any>) => {
    onHandleBookmark(record);
  };

  const dataSource = results.map((item) => ({
    key: item.id,
    id: item.id,
    name: item.name,
    owner: item.owner.login ?? item.owner,
    description: item.description,
    stargazers_count: item.stargazers_count,
  }));

  return (
    <div className="table-wrapper">
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default CustomTable;
