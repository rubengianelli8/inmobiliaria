import React from "react";
import Layout from "@/containers/layout";
import ViewReceipts from "@/containers/receipt/view-receipts";

const index = () => {
  return (
    <Layout>
      <div className="flex w-4/5 mt-5 mb-10 mx-auto justify-center">
        <div className="rounded border ">
          <ViewReceipts />
        </div>
      </div>
    </Layout>
  );
};

export default index;
