import React, { useEffect } from "react";
import Router from "next/router";
import { useLazyQuery } from "@apollo/client";

import { GET_ALL_OWNERS } from "@/gql/owner.gql";

const ViewOwners = () => {
  const [owners, { data: dataOwners }] = useLazyQuery(GET_ALL_OWNERS);

  useEffect(() => {
    owners();
  }, [dataOwners]);
  return (
    <div className="flex w-full justify-center mt-8">
      <table className=" mt-3">
        <tr className="border border-gray-300 bg-secondary text-quaternary">
          <th className="p-3 border-l hidden md:table-cell">DNI</th>
          <th className="p-3 border-l">Email</th>
          <th className="p-3 border-l">Nombre</th>
          <th className="p-3 border-l">Apellido</th>
          <th className="p-3 border-l hidden sm:table-cell">
            Dirección personal
          </th>
          <th className="p-3 border-l hidden md:table-cell ">
            Dirección laboral
          </th>
          <th className="p-3 border-l hidden md:table-cell ">Telefono</th>
          <th className="p-3 border-l hidden md:table-cell ">Celular</th>
        </tr>
        {dataOwners?.getAllOwners?.map((item) => (
          <tr
            key={item.id}
            className="border border-gray-300 p-3 cursor-pointer"
            onClick={() => {
              Router.push(`/owner/user/${item.id}`);
            }}
          >
            <td className="p-3 border-l hidden md:table-cell">
              {item.user.dni}
            </td>
            <td className="p-3 border-l">{item.user.email}</td>
            <td className="p-3 border-l">{item.user.first_name}</td>
            <td className="p-3 border-l">{item.user.last_name}</td>
            <td className="p-3 border-l hidden sm:table-cell">
              {item.user.personal_address}
            </td>
            <td className="p-3 border-l hidden md:table-cell">
              {item.user.work_address ? item.user.work_address : "--------"}
            </td>
            <td className="p-3 border-l hidden md:table-cell">
              {item.user.phone ? item.user.phone : "--------"}
            </td>
            <td className="p-3 border-l hidden md:table-cell">
              {item.user.cell_phone ? item.user.cell_phone : "--------"}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default ViewOwners;
