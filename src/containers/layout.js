import React, { useEffect } from "react";
import Router from "next/router";
import NavBar from "@/components/navbar";
import { useSession } from "next-auth/client";

const Layout = ({ children }) => {
  const [session, loading] = useSession();
  useEffect(() => {
    if (!session && !loading) {
      Router.push("/signin");
    }
  }, [session, loading]);
  return (
    <>
      {!loading && session && (
        <>
          <NavBar />
          <div className="h-[60px]"></div>
          <div className="col-start-1 col-end-13">{children}</div>
        </>
      )}
    </>
  );
};

export default Layout;
