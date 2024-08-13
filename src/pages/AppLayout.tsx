import React, { useState } from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { Outlet } from "react-router-dom";
import Header from "../components/header/header";

export const AppLayout: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Provider store={store}>
      <Header onSearch={handleSearch} />
      <Outlet context={{ searchQuery }} />
    </Provider>
  );
};
