import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Router from "next/router";

import { useQuery } from "@apollo/client";
import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";

import { GET_ALL_OWNERS } from "@/gql/owner.gql";

const customStyles = {
  headCells: {
    style: {
      fontStyle: "bold",
      fontSize: "1rem",
      backgroundColor: "#e8e8e8",
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
    },
  },
  footer: {
    style: {
      color: "#000000",
    },
  },
};
const ViewOwners = () => {
  const [page, setPage] = useState(0);
  const [page_size, setPage_size] = useState(10);
  const [search, setSearch] = useState({ name: null, dni: null });

  const { data: dataOwners, refetch } = useQuery(GET_ALL_OWNERS, {
    variables: {
      page: page,
      pageSize: 10,
      dni: search.dni,
      name: search.name,
    },
  });

  const columns = [
    { name: "DNI", selector: "user.dni", sortable: false },
    { name: "Email", selector: "user.email", sortable: false },
    { name: "Nombre", selector: "user.first_name", sortable: false },
    { name: "Apellido", selector: "user.last_name", sortable: false },
    {
      name: "Dirección personal",
      selector: "user.personal_address",
      sortable: false,
    },
    {
      name: "Dirección laboral",
      selector: (d) => (d.user.work_address ? d.user.work_address : "-----"),
      sortable: false,
    },
    {
      name: "Teléfono",
      selector: (d) => (d.user.phone ? d.user.phone : "-----"),
      sortable: false,
    },
    {
      name: "Celular",
      selector: (d) => (d.user.cell_phone ? d.user.cell_phone : "-----"),
      sortable: false,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="flex gap-x-2 text-center justify-center text-tertiary">
          <AiFillEdit
            size={18}
            className="cursor-pointer hover:text-gray-700"
            onClick={() => Router.push(`/owner/add-owner?id=${row.id}`)}
            title="Editar"
          />
          <FaTrash
            size={18}
            className="cursor-pointer hover:text-gray-700"
            title="Eliminar"
            onClick={() => {
              /* setIdEstate(row.id);
              setOpenModal(true); */
            }}
          />
        </div>
      ),
      button: true,
      ignoreRowClick: true,
    },
  ];

  const handleSubmitFilter = (e) => {
    e.preventDefault();
    refetch({
      page: page,
      pageSize: 10,
      dni: parseInt(search.dni),
      name: search.name,
    });
  };
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
            onClick={handleSubmitFilter}
            className="ml-auto bg-tertiary py-2 px-3 rounded mb-1 md:mb-0"
          >
            Filtrar
          </button>
        </form>
      </div>
      <div className="flex w-full justify-center mt-2">
        <div>
          <DataTable
            columns={columns}
            data={dataOwners?.getAllOwners.results}
            responsive={true}
            pointerOnHover
            highlightOnHover
            persistTableHead
            fixedHeader
            pagination
            paginationServer
            customStyles={customStyles}
            paginationTotalRows={dataOwners?.getAllOwners?.total}
            paginationPerPage={10}
            onRowClicked={(row) => {
              Router.push(`/owner/user/${row.id}`);
            }}
            onChangePage={async (page) => {
              setPage(page);
              await refetch({
                page: page,
                pageSize: page_size,
                dni: parseInt(search.dni),
                name: search.name,
              });
            }}
            onChangeRowsPerPage={async (page_size, page) => {
              setPage_size(page_size);
              await refetch({
                page: page,
                pageSize: page_size,
                dni: parseInt(search.dni),
                name: search.name,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewOwners;
