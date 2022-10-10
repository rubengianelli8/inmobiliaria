import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Router from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { AiFillEdit, AiFillHome } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";

import { GET_ALL_CLIENTS } from "@/gql/queries/client.gql";
import { DELETE_CLIENT } from "@/gql/mutations/client.gql";
import ModalAlert from "@/components/modal-alert";
import Loader from "@/components/loader";

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
const ViewClients = () => {
  const [page, setPage] = useState(0);
  const [page_size, setPage_size] = useState(10);
  const [search, setSearch] = useState({ dni: null, name: null });

  const [idClient, setIdClient] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const [deleteClient] = useMutation(DELETE_CLIENT);
  const {
    data: dataClients,
    refetch,
    loading,
  } = useQuery(GET_ALL_CLIENTS, {
    variables: {
      page: page,
      pageSize: 10,
      dni: search.dni,
      name: search.name,
    },
  });

  const columns = [
    { name: "DNI", selector: "user.dni", sortable: false },
    {
      name: "Email",
      selector: (r) => (r.user.email.length > 1 ? r.user.email : "----"),
      sortable: false,
    },
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
            onClick={() => Router.push(`/client/add-client?id=${row.id}`)}
            title="Editar"
          />
          {row.estate[0]?.id && (
            <AiFillHome
              size={18}
              className="cursor-pointer hover:text-gray-700"
              onClick={() => {
                Router.push(`/estates/${row.estate[0].id}`);
              }}
              title={"Ver propiedad"}
            />
          )}
          <FaTrash
            size={18}
            className="cursor-pointer hover:text-gray-700"
            title="Eliminar"
            onClick={() => {
              setIdClient(row.id);
              setOpenModal(true);
            }}
          />
        </div>
      ),
      button: true,
      ignoreRowClick: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    await refetch({
      page: page,
      pageSize: page_size,
      dni: parseInt(search.dni),
      name: search.name,
    });
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
  }, []);
  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <div>
          <ModalAlert
            acceptButton={"Eliminar"}
            cancelButton={"Cancelar"}
            open={openModal}
            setOpen={setOpenModal}
            action={async () => {
              await deleteClient({ variables: { clientId: idClient } });
              await refetch({
                page: page,
                pageSize: page_size,
                dni: parseInt(search.dni),
                name: search.name,
              });
              setOpenModal(false);
            }}
            cancelAction={() => {
              setOpenModal(false);
            }}
            title={"Eliminar inquilino"}
            message={`¿Está seguro de eliminar este inquilino?.
          Esta acción no se puede deshacer`}
          />
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
          <div className="w-4/5 mx-auto rounded mt-5 mb-10 border">
            <DataTable
              columns={columns}
              data={dataClients?.getAllClients.results}
              responsive={true}
              pointerOnHover
              highlightOnHover
              persistTableHead
              fixedHeader
              pagination
              paginationServer
              customStyles={customStyles}
              paginationTotalRows={dataClients?.getAllClients?.total}
              paginationPerPage={10}
              onRowClicked={(row) => {
                Router.push(`/client/user/${row.id}`);
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
      )}
    </>
  );
};

export default ViewClients;
