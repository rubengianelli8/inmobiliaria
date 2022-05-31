import NavBar from "@/components/navbar";
import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className="col-start-1 col-end-13">{children}</div>
    </>
  );
};

export default Layout;
