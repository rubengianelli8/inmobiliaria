import React, { useEffect, useState } from "react";
import CardEstate from "@/components/card-estate";
import { useLazyQuery } from "@apollo/client";

import { GET_ALL_ESTATES_BY_OWNER } from "@/gql/queries/estate.gql";

const ViewEstates = ({ id_owner }) => {
  const [getAllEstatesByOwner, { data: dataEstates }] = useLazyQuery(
    GET_ALL_ESTATES_BY_OWNER
  );
  useEffect(() => {
    if (id_owner) getAllEstatesByOwner({ variables: { owner_id: id_owner } });
  }, [dataEstates, id_owner]);
  return (
    <div className="flex flex-col w-full items-center">
      {dataEstates?.getAllEstatesByOwner.map((estate) => (
        <CardEstate estate={estate} />
      ))}
    </div>
  );
};

export default ViewEstates;
