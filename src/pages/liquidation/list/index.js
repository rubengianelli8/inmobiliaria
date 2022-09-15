import React from "react";
import Layout from "@/containers/layout";
import dynamic from "next/dynamic";

const ViewLiquidations = dynamic(
  () => import("../../../containers/liquidation/view-liquidations"),
  {
    ssr: false,
  }
);

const index = () => {
  return (
    <Layout>
      <div className="w-4/5 mx-auto rounded mt-5 mb-10 border">
        <ViewLiquidations />
      </div>
    </Layout>
  );
};

export default index;
