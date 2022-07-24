import React from "react";
import Layout from "@/containers/layout";
import ViewLiquidations from "@/containers/liquidation/view-liquidations";
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
