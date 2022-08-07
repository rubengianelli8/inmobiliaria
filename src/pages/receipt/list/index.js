import React from "react";
import Layout from "@/containers/layout";
import ViewReceipts from "@/containers/receipt/view-receipts";

const index = () => {
  return (
    <Layout>
      <div className="w-4/5 mx-auto rounded mt-5 mb-10 border">
        <ViewReceipts />
      </div>
    </Layout>
  );
};

export default index;
