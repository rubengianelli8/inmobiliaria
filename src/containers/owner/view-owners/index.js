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
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-4/5 text-sm text-left text-gray-800 max-w-[800px]">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                DNI
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Apellido
              </th>
              <th scope="col" className="px-6 py-3">
                Dirección personal
              </th>
              <th scope="col" className="px-6 py-3">
                Dirección laboral
              </th>
              <th scope="col" className="px-6 py-3">
                Telefono
              </th>
              <th scope="col" className="px-6 py-3">
                Celular
              </th>
            </tr>
          </thead>
          <tbody>
            {dataOwners?.getAllOwners?.map((item) => (
              <tr
                key={item.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
                onClick={() => {
                  Router.push(`/owner/user/${item.id}`);
                }}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {item.user.dni}
                </th>
                <td className="px-6 py-4">{item.user.email}</td>
                <td className="px-6 py-4">{item.user.first_name}</td>
                <td className="px-6 py-4">{item.user.last_name}</td>
                <td className="px-6 py-4">{item.user.personal_address}</td>
                <td className="px-6 py-4">
                  {item.user.work_address ? item.user.work_address : "--------"}
                </td>
                <td className="px-6 py-4">
                  {item.user.phone ? item.user.phone : "--------"}
                </td>
                <td className="px-6 py-4">
                  {item.user.cell_phone ? item.user.cell_phone : "--------"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <table className=" mt-3 table-auto">
        <thead>
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
        </thead>
        <tbody>
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
        </tbody>
      </table> */}
    </div>
  );
};

export default ViewOwners;
