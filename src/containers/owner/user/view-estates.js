import React, { useEffect, useState } from "react";
import CardEstate from "@/components/card-estate";
import { useLazyQuery } from "@apollo/client";

import { GET_ALL_ESTATES_BY_OWNER } from "@/gql/queries/estate.gql";

const ViewEstates = ({ id_owner, id_client }) => {
  const [getAllEstatesByOwner, { data: dataEstates, loading }] = useLazyQuery(
    GET_ALL_ESTATES_BY_OWNER
  );

  useEffect(() => {
    if (id_owner) getAllEstatesByOwner({ variables: { ownerId: id_owner } });
  }, [dataEstates, id_owner]);

  useEffect(() => {
    if (id_client) {
      getAllEstatesByOwner({ variables: { clientId: id_client } });
    }
  }, [dataEstates, id_client]);

  return (
    <div className="flex flex-col w-full items-center">
      {dataEstates?.getAllEstatesByOwner.results.length > 0 ? (
        dataEstates?.getAllEstatesByOwner.results.map((estate) => (
          <CardEstate estate={estate} key={estate.id} />
        ))
      ) : (
        <p className="text-18 md:text-25 text-tertiary font-bold mt-20">
          No hay propiedades cargadas aún.
        </p>
      )}
    </div>
  );
};

export default ViewEstates;
