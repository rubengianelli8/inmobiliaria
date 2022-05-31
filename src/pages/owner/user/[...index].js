import React, { useEffect, useState } from "react";
import Router from "next/router";
import { useLazyQuery } from "@apollo/client";
import { GET_OWNER } from "@/gql/owner.gql";

import Layout from "@/containers/layout";
import OwnerLayout from "@/containers/owner/owner-layout";

const User = () => {
  const [Owner, { data }] = useLazyQuery(GET_OWNER);
  const id = Router?.router?.query?.index;

  const [user, setUser] = useState({});
  useEffect(() => {
    if (id) Owner({ variables: { getOwnerId: parseInt(id) } });
    setUser(data?.getOwner?.user);
  }, [data, id]);
  return (
    <Layout>
      <OwnerLayout>
        <div className="flex justify-center w-full mt-5">
          <div className="grid grid-cols-2 justify-center w-4/5 gap-x-3 items-center">
            <div className="flex flex-col border justify-center py-3 px-6 mx-auto shadow-box">
              <div className="flex flex-row text-18 mb-2">
                <span className="font-bold mr-2 text-primary">Dni:</span>
                <span>{user?.dni}</span>
              </div>
              <div className="flex flex-row text-18 mb-2">
                <span className="font-bold mr-2 text-primary">Email:</span>
                <span>{user?.email}</span>
              </div>
              <div className="flex flex-row text-18 mb-2">
                <span className="font-bold mr-2 text-primary">Nombre:</span>
                <span>{user?.first_name}</span>
              </div>
              <div className="flex flex-row text-18 mb-2">
                <span className="font-bold mr-2 text-primary">Apellido:</span>
                <span>{user?.last_name}</span>
              </div>
              <div className="flex flex-row text-18 mb-2">
                <span className="font-bold mr-2 text-primary">
                  Direccion P:
                </span>
                <span>{user?.personal_address}</span>
              </div>
              <div className="flex flex-row text-18 mb-2">
                <span className="font-bold mr-2 text-primary">
                  Direccion L:
                </span>
                <span>{user?.work_address}</span>
              </div>
              <div className="flex flex-row text-18 mb-2">
                <span className="font-bold mr-2 text-primary">Telefono:</span>
                <span>{user?.phone}</span>
              </div>
              <div className="flex flex-row text-18 mb-2">
                <span className="font-bold mr-2 text-primary">Celular:</span>
                <span>{user?.cell_phone}</span>
              </div>
              <div
                className="underline text-blue-500 text-14 cursor-pointer"
                onClick={() => {
                  Router.push(
                    `/owner/user/add-estate?id_owner=${data?.getOwner?.id}`
                  );
                }}
              >
                Editar propietario
              </div>
            </div>
          </div>
        </div>
      </OwnerLayout>
    </Layout>
  );
};

export default User;
