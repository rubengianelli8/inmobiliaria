import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Router from "next/router";
import { useLazyQuery } from "@apollo/client";

import { GET_RECEIPT_BY_ID } from "@/gql/queries/receipt.gql";
import NavBar from "@/components/navbar";

const Receipt = dynamic(() => import("../../containers/receipt"), {
  ssr: false,
});

const index = () => {
  const id = Router.router?.query?.index;
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [getReceipt, { data, loading, called }] =
    useLazyQuery(GET_RECEIPT_BY_ID);

  useEffect(() => {
    if (id?.length) {
      getReceipt({ variables: { receiptId: parseInt(id[0]) } });
    }
  }, [id]);

  useEffect(() => {
    if (data) setIsDataLoaded(data.getReceipt);
  }, [data]);

  return (
    <>
      {/* {called && !loading && !isDataLoaded && (
        <div>
          {alert("El recibo que estas tratando de ver no existe")}
          {Router.push("/receipt")}
        </div>
      )} */}
      <NavBar />

      {called && !loading && data?.getReceipt && (
        <Receipt receipt={data?.getReceipt} />
      )}
    </>
  );
};

export default index;
