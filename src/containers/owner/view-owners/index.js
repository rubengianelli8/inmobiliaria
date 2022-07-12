import React, { useEffect, useState } from "react";
import Router from "next/router";
import { useLazyQuery, useQuery } from "@apollo/client";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import { GET_ALL_OWNERS, TOTAL_OWNERS } from "@/gql/owner.gql";

const ViewOwners = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState({
    name: null,
    dni: null,
  });
  const [search, setSearch] = useState({});

  const { data: cantOwners } = useQuery(TOTAL_OWNERS);
  const { data: dataOwners, refetch } = useQuery(GET_ALL_OWNERS, {
    variables: {
      page: page,
      pageSize: 10,
      dni: filters.dni,
      name: filters.name,
    },
  });

  useEffect(() => {
    refetch({
      page: page,
      pageSize: 10,
      dni: parseInt(filters.dni),
      name: filters.name,
    });
    setTotalPages(Math.ceil(cantOwners?.totalOwners / 10));
  }, [dataOwners, page, filters]);

  const handleChange = (e) => {
    e.preventDefault();
    setSearch({ ...search, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="w-4/5 max-w-[800px] mx-auto p-1 bg-gray-200 mt-3 flex rounded">
        <form className="w-full flex flex-col md:flex-row mx-2 gap-x-3 gap-y-3">
          <input
            type="number"
            className="rounded-full px-3 py-2"
            placeholder="Dni"
            name="dni"
            onChange={handleChange}
          />

          <input
            className="rounded-full px-3 py-2"
            placeholder="Nombre"
            name="name"
            onChange={handleChange}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setFilters({ ...search });
            }}
            className="ml-auto bg-tertiary py-2 px-3 rounded mb-1 md:mb-0"
          >
            Filtrar
          </button>
        </form>
      </div>
      <div className="flex w-full justify-center mt-2">
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
                    {item.user.work_address
                      ? item.user.work_address
                      : "--------"}
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
      </div>
      <div className="w-4/5 flex mx-auto justify-center max-w-[800px] items-center gap-x-2 py-2 bg-gray-200 rounded-b">
        {page > 0 && (
          <button
            onClick={() => {
              if (page > 0) setPage(page - 1);
            }}
          >
            <AiOutlineLeft size={16} />
          </button>
        )}
        <p className="font-semibold text-16">{page + 1}</p>
        {page + 1 < totalPages && (
          <button
            onClick={() => {
              let totalpages = Math.ceil(cantOwners.totalOwners / 10);
              console.log("tot", totalpages);
              console.log("cant", cantOwners.totalOwners);
              if (!(page + 1 >= totalpages)) setPage(page + 1);
            }}
          >
            <AiOutlineRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ViewOwners;
