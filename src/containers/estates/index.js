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
    { name: "Ciudad", selector: "city", sortable: false },
    { name: "Barrio", selector: "neighborhood", sortable: false },
    {
      name: "Dirección",
      selector: (row) => {
        row.address + " " + row.address_number;
      },
      sortable: false,
    },
    { name: "Dominio", selector: "domain", sortable: false },
    {
      name: "N° Pda. Inmobiliaria",
      selector: "certificate_estate",
      sortable: false,
    },
    {
      name: "Estado",
      selector: "status",
      sortable: false,
    },
    {
      name: "Precio",
      selector: "price",
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
    e.preventDefault();
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  useEffect(async () => {
    if (idClient) {
      setSearch({ ...search, status: "Disponible" });
      await refetch({
        ...search,
        page,
        page_size,
        status: "Disponible",
        until: parseInt(search.until),
        since: parseInt(search.since),
      });
      setSearch({ ...search, status: "Disponible" });
    }
  }, [idClient]);
  const onSubmit = async (e) => {
    e.preventDefault();
    await refetch({
      ...search,
      page: page,
      page_size: page_size,
      until: parseInt(search.until),
      since: parseInt(search.since),
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
      {!loading && (
        <div>
          <div className="w-4/5 max-w-[800px] mx-auto p-1 bg-gray-200 mt-3 flex rounded">
            <form className="w-full flex flex-col mx-2 mt-2">
              <div className="flex flex-col md:flex-row gap-y-2 gap-x-2">
                <input
                  className="rounded-full px-3 py-2"
                  placeholder="Dominio"
                  name="domain"
                  onChange={handleChange}
                />

                <input
                  className="rounded-full px-3 py-2"
                  placeholder="Barrio"
                  name="neighborhood"
                  onChange={handleChange}
                />
              </div>
              <p>Precio:</p>
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
              <button
                onClick={onSubmit}
                className="ml-auto bg-tertiary py-2 px-3 rounded mb-1 md:mb-0 mt-1"
              >
                Filtrar
              </button>
            </form>
          </div>
          <div className="flex w-full justify-center mt-2">
            <div>
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
                    ...search,
                  });
                }}
                onChangeRowsPerPage={async (page_size, page) => {
                  setPage_size(page_size);
                  await refetch({
                    page: page,
                    pageSize: page_size,
                    ...search,
                  });
                }}
              />
            </div>
            {/* <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-4/5 text-sm text-left text-gray-800 max-w-[800px] table-auto">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Barrio
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Ciudad
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Dirección
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Nro
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Dominio
                    </th>
                    <th scope="col" className="px-6 py-3">
                      N° Pda. inmobiliaria
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Estado
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Precio
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataEstates?.getAllEstatesByOwner?.map((item) => (
                    <tr key={item.id} className=" border-b cursor-pointer">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        onClick={() => {
                          Router.push(`/estates/${item.id}`);
                        }}
                      >
                        {item.neighborhood || "-----"}
                      </th>
                      <td
                        className="px-6 py-4 capitalize"
                        onClick={() => {
                          Router.push(`/estates/${item.id}`);
                        }}
                      >
                        {item.city}
                      </td>
                      <td className="px-6 py-4 capitalize">{item.address}</td>
                      <td className="px-6 py-4">{item.address_number}</td>
                      <td className="px-6 py-4">{item.domain}</td>
                      <td className="px-6 py-4">{item.certificate_estate}</td>
                      <td className="px-6 py-4">{item.status}</td>
                      <td className="px-6 py-4">{item.price || "--"}</td>
                      <td className="px-6 py-4 text-tertiary">
                        {!idClient ? (
                          <div className="flex gap-x-2">
                            <AiFillEdit
                              size={18}
                              className="cursor-pointer hover:text-gray-700"
                              onClick={() =>
                                Router.push(
                                  `/owner/user/add-estate?id_estate=${item.id}`
                                )
                              }
                              title="Editar"
                            />
                            <FaUserAlt
                              size={18}
                              className="cursor-pointer hover:text-gray-700"
                              onClick={() =>
                                Router.push(`/owner/user/${item.id_owner}`)
                              }
                              title="Ver propietario"
                            />
                            {item.payment_plan.length > 0 && (
                              <MdReceipt
                                size={18}
                                className="cursor-pointer hover:text-gray-700"
                                title="Generar recibo"
                                onClick={() => {
                                  Router.push(
                                    `/receipt/add-receipt/${item.id}`
                                  );
                                }}
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
                          </div>
                        ) : (
                          <p className="flex gap-x-2">
                            <button
                              className="cursor-pointer hover:text-gray-700 text-16"
                              onClick={() => {
                                setEstate(item);
                                setOpenPaymentModal(true);
                              }}
                              title="Asignar propiedad"
                            >
                              Asignar propiedad
                            </button>
                          </p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {dataEstates?.getAllEstatesByOwner?.length === 0 && (
                <div className="w-full flex justify-center py-3">
                  <p className="text-20">No se encontraron propiedades</p>
                </div>
              )}
            </div> */}
          </div>

          {/* <div className="w-4/5 flex mx-auto justify-center max-w-[800px] items-center gap-x-2 py-2 bg-gray-200 rounded-b">
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
                  if (!(page + 1 >= totalpages)) setPage(page + 1);
                }}
              >
                <AiOutlineRight size={16} />
              </button>
            )}
          </div> */}
        </div>
      )}
    </>
  );
};

export default Estates;
