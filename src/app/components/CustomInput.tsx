"use client";

import { Input } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import { useBookmarkContext } from "../context";

const { Search } = Input;

const CustomInput = () => {
  const { onFetchRepos } = useBookmarkContext();

  const onSearchRepos: SearchProps["onSearch"] = (value) => {
    if (value.trim()) return onFetchRepos(value.trim());
  };

  return (
    <div className="form-control-wrapper">
      <Search
        placeholder="input search text"
        enterButton="Search"
        size="large"
        onSearch={onSearchRepos}
      />
    </div>
  );
};

export default CustomInput;
