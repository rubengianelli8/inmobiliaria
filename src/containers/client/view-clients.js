import React, { useEffect, useState } from "react";
import Router from "next/router";
import { useLazyQuery, useQuery } from "@apollo/client";
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiFillEdit,
  AiFillHome,
} from "react-icons/ai";
import { FaTrash, FaUserAlt } from "react-icons/fa";

import { GET_ALL_CLIENTS, TOTAL_CLIENTS } from "@/gql/queries/client.gql";

const ViewClients = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState({ dni: null, name: null });

  const { data: cantClients, refetch: refetchTotal } = useQuery(TOTAL_CLIENTS, {
    variables: {
      page: page,
      pageSize: 10,
      dni: search.dni,
      name: search.name,
    },
  });
  const { data: dataClients, refetch } = useQuery(GET_ALL_CLIENTS, {
    variables: {
      page: page,
      pageSize: 10,
      dni: search.dni,
      name: search.name,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await refetch({
      page: page,
      pageSize: 10,
      dni: parseInt(search.dni),
      name: search.name,
    });
    await refetchTotal({
      dni: parseInt(search.dni),
      name: search.name,
    });
    setTotalPages(Math.ceil(cantClients?.totalClients / 10));
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  useEffect(async () => {
    await refetch({
      page: page,
      pageSize: 10,
      dni: parseInt(search.dni),
      name: search.name,
    });
    await refetchTotal({
      dni: parseInt(search.dni),
      name: search.name,
    });
  }, []);
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
            onClick={handleSubmit}
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
                <th scope="col" className="px-6 py-3">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {dataClients?.getAllClients?.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    onClick={() => {
                      Router.push(`/client/user/${item.id}`);
                    }}
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
                  <td className="px-6 py-4 text-tertiary">
                    <p className="flex gap-x-2 text-center justify-center">
                      <AiFillEdit
                        size={18}
                        className="cursor-pointer hover:text-gray-700"
                        onClick={() =>
                          Router.push(`/client/add-client?id=${item.id}`)
                        }
                        title="Editar"
                      />
                      {item.estate[0]?.id && (
                        <AiFillHome
                          size={18}
                          className="cursor-pointer hover:text-gray-700"
                          onClick={() => {
                            Router.push(`/estates?id_client=${item.id}`);
                          }}
                          title={"Asignar propiedad"}
                        />
                      )}
                      <FaTrash
                        size={18}
                        className="cursor-pointer hover:text-gray-700"
                        title="Eliminar"
                        onClick={() => {
                          setIdEstate(item.id);
                          setOpenModal(true);
                        }}
                      />
                    </p>
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
              let totalpages = Math.ceil(cantClients.totalClients / 10);
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

export default ViewClients;
