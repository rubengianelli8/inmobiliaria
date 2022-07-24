import React from "react";
import Layout from "@/containers/layout";
import AddLiquidation from "@/containers/liquidation/add-liquidation";

const index = () => {
  return (
    <div>
      <Layout>
        <AddLiquidation />
      </Layout>
    </div>
  );
};

export default index;
