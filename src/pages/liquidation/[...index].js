import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Router from "next/router";
import { useLazyQuery } from "@apollo/client";

import { GET_LIQUIDATION } from "@/gql/queries/liquidation.glq";

const Liquidation = dynamic(
  () => import("../../containers/liquidation/index"),
  {
    ssr: false,
  }
);

const index = () => {
  const id = Router.router?.query?.index;
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [getLiquidation, { data, loading, called }] =
    useLazyQuery(GET_LIQUIDATION);

  useEffect(() => {
    if (id?.length) {
      getLiquidation({ variables: { liquidationId: parseInt(id[0]) } });
    }
  }, [id]);

  useEffect(() => {
    if (data) setIsDataLoaded(data.getLiquidation);
  }, [data]);
  console.log(data);
  return (
    <>
      {/* {called && !loading && !isDataLoaded && (
        <div>
          {alert("El recibo que estas tratando de ver no existe")}
          {Router.push("/receipt")}
        </div>
      )} */}

      {called && !loading && data?.getLiquidation && (
        <Liquidation liquidation={data?.getLiquidation} />
      )}
    </>
  );
};

export default index;
