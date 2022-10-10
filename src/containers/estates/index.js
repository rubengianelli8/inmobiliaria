import React, { useState, useEffect } from "react";
import Router from "next/router";
import DataTable from "react-data-table-component";

import { AiFillEdit } from "react-icons/ai";
import { FaTrash, FaUserAlt } from "react-icons/fa";
import { MdReceipt } from "react-icons/md";
import { useQuery, useMutation } from "@apollo/client";

import { GET_ALL_ESTATES_BY_OWNER } from "@/gql/queries/estate.gql";
import { DELETE_ESTATE, UPDATE_ESTATE } from "@/gql/mutations/estate.gql";
import ModalAlert from "@/components/modal-alert";
import ModalComponent from "@/components/modal-component";
import PaymentPlan from "./payment_plan";
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

const Estates = () => {
  const {
    data: dataEstates,
    loading,
    refetch,
  } = useQuery(GET_ALL_ESTATES_BY_OWNER);

  const [deleteEstate] = useMutation(DELETE_ESTATE);
  const [updateEstate] = useMutation(UPDATE_ESTATE);
  const idClient = Router.router?.query?.id_client;

  const [idEstate, setIdEstate] = useState(null);
  const [estate, setEstate] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [search, setSearch] = useState({});

  const [page, setPage] = useState(0);
  const [page_size, setPage_size] = useState(10);

  const columns = [
    { name: "Ciudad", selector: (row) => row.city, sortable: false },
    { name: "Barrio", selector: (row) => row.neighborhood, sortable: false },
    {
      name: "Dirección",
      selector: (row) => {
        return row.address + " " + row.address_number;
      },
      sortable: false,
    },
    { name: "Dominio", selector: (row) => row.domain, sortable: false },
    {
      name: "N° Pda. Inmobiliaria",
      selector: (row) => row.certificate_estate,
      sortable: false,
    },
    {
      name: "Estado",
      selector: (row) => row.status,
      sortable: false,
    },
    {
      name: "Precio",
      selector: (row) => row.price,
      sortable: false,
    },
    {
      name: "Acciones",
      cell: (row) =>
        !idClient ? (
          <div className="flex gap-x-2 text-tertiary">
            <AiFillEdit
              size={18}
              className="cursor-pointer hover:text-gray-700"
              onClick={() =>
                Router.push(`/owner/user/add-estate?id_estate=${row.id}`)
              }
              title="Editar"
            />
            <FaUserAlt
              size={18}
              className="cursor-pointer hover:text-gray-700"
              onClick={() => Router.push(`/owner/user/${row.id_owner}`)}
              title="Ver propietario"
            />
            {row.payment_plan.length > 0 && (
              <MdReceipt
                size={18}
                className="cursor-pointer hover:text-gray-700"
                title="Generar recibo"
                onClick={() => {
                  Router.push(`/receipt/add-receipt/${row.id}`);
                }}
              />
            )}
            <FaTrash
              size={18}
              className="cursor-pointer hover:text-gray-700"
              title="Eliminar"
              onClick={() => {
                setIdEstate(row.id);
                setOpenModal(true);
              }}
            />
          </div>
        ) : (
          <div className="flex gap-x-2 text-tertiary">
            <button
              className="cursor-pointer hover:text-gray-700 text-16"
              onClick={() => {
                setEstate(row);
                setOpenPaymentModal(true);
              }}
              title="Asignar propiedad"
            >
              Asignar propiedad
            </button>
          </div>
        ),
      button: true,
      ignoreRowClick: true,
    },
  ];
  const handleChange = (e) => {
    //e.preventDefault();
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  useEffect(async () => {
    if (idClient) {
      setSearch({ ...search, status: "Disponible" });
      await refetch({
        ...search,
        page,
        page_size,
        search: { ...search, status: "Disponible" },
      });
      setSearch({ ...search, status: "Disponible" });
    }
  }, [idClient]);
  const onSubmit = async (e) => {
    e.preventDefault();
    await refetch({
      search,
      page: page,
      page_size: page_size,
    });
  };
  const onDelete = async (id) => {
    await deleteEstate({ variables: { deleteEstateId: id } });
    refetch();
  };
  const setEstateToClient = async (id) => {
    updateEstate({
      variables: {
        idEstate: parseInt(id),
        id_client: parseInt(idClient),
        status: "Alquilada",
      },
    });
  };
  return (
    <>
      <ModalAlert
        acceptButton="Aceptar"
        cancelButton="Cancelar"
        action={() => onDelete(idEstate)}
        cancelAction={() => setOpenModal(false)}
        message="¿Está seguro que desea eliminar esta propiedad?"
        title={`Eliminar propiedad`}
        open={openModal}
        setOpen={setOpenModal}
      />
      <ModalComponent
        acceptButton="Aceptar"
        cancelButton="Cancelar"
        cancelAction={() => setOpenModal(false)}
        title={`Plan de pago`}
        open={openPaymentModal}
        setOpen={setOpenPaymentModal}
      >
        <PaymentPlan
          estate={estate}
          setEstateToClient={setEstateToClient}
          idClient={parseInt(idClient)}
        />
      </ModalComponent>
      {loading && <Loader />}
      {!loading && (
        <div>
          <div className="mx-5 p-1 bg-gray-200 mt-3 flex rounded">
            <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4 mx-4">
              <div>
                <p className="underline mt-3 font-bold">Dirección:</p>
                <div className="flex flex-col md:flex-row gap-y-2 gap-x-2">
                  <input
                    className="rounded-full px-3 py-2"
                    placeholder="Calle"
                    name="address"
                    onChange={handleChange}
                  />

                  <input
                    className="rounded-full px-3 py-2"
                    placeholder="Numero"
                    name="address_number"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <p className="underline mt-3 font-bold">Propietario:</p>
                <div className="flex flex-col md:flex-row gap-y-2 gap-x-2">
                  <input
                    className="rounded-full px-3 py-2"
                    placeholder="Propietario"
                    name="full_name"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <p className="underline mt-3 font-bold">
                  Estado de la propiedad:
                </p>
                <div className="flex flex-col gap-y-2 gap-x-2 ">
                  <div>
                    <input
                      className="rounded-full px-3 py-2"
                      type="radio"
                      name="status"
                      id="all"
                      defaultChecked
                      value="all"
                      onChange={handleChange}
                    />
                    <label>Todas</label>
                  </div>
                  <div>
                    <input
                      className="rounded-full px-3 py-2"
                      type="radio"
                      name="status"
                      id="Disponible"
                      value="Disponible"
                      onChange={handleChange}
                    />
                    <label>Disponibles</label>
                  </div>
                  <div>
                    <input
                      className="rounded-full px-3 py-2"
                      type="radio"
                      name="status"
                      id="Alquilada"
                      value="Alquilada"
                      onChange={handleChange}
                    />
                    <label>Alquiladas</label>
                  </div>
                </div>
              </div>
              <div>
                <p className="underline mt-3 font-bold">Precio:</p>
                <div className="flex flex-col md:flex-row gap-y-2 gap-x-2">
                  <input
                    type="number"
                    className="rounded-full px-3 py-2"
                    placeholder="Desde"
                    name="since"
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    className="rounded-full px-3 py-2"
                    placeholder="Hasta"
                    name="until"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <button
                onClick={onSubmit}
                className="ml-auto bg-tertiary py-2 px-3 rounded mb-1 md:mb-0 mt-1"
              >
                Filtrar
              </button>
            </form>
          </div>
          <div className="w-4/5 mx-auto rounded mt-5 mb-10 border">
            <DataTable
              columns={columns}
              data={dataEstates?.getAllEstatesByOwner?.results}
              responsive={true}
              pointerOnHover
              highlightOnHover
              persistTableHead
              fixedHeader
              pagination
              paginationServer
              customStyles={customStyles}
              paginationTotalRows={dataEstates?.getAllEstatesByOwner?.total}
              paginationPerPage={10}
              onRowClicked={(row) => {
                Router.push(Router.push(`/estates/${row.id}`));
              }}
              onChangePage={async (page) => {
                setPage(page);
                await refetch({
                  page: page,
                  pageSize: page_size,
                  search,
                });
              }}
              onChangeRowsPerPage={async (page_size, page) => {
                setPage_size(page_size);
                await refetch({
                  page: page,
                  pageSize: page_size,
                  search,
                });
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Estates;
