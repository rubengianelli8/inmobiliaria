import React, { useState, useEffect } from "react";
import Router from "next/router";

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { FaTrash, FaUserAlt } from "react-icons/fa";

import { useQuery, useMutation } from "@apollo/client";
import {
  GET_ALL_ESTATES_BY_OWNER,
  GET_TOTAL_ESTATES,
} from "@/gql/queries/estate.gql";
import { DELETE_ESTATE, UPDATE_ESTATE } from "@/gql/mutations/estate.gql";
import ModalAlert from "@/components/modal-alert";
import ModalComponent from "@/components/modal-component";
import PaymentPlan from "./payment_plan";

const Estates = () => {
  const {
    data: dataEstates,
    loading,
    refetch,
  } = useQuery(GET_ALL_ESTATES_BY_OWNER);

  const { data: totalEstates, refetch: refetchTotal } =
    useQuery(GET_TOTAL_ESTATES);

  const [deleteEstate] = useMutation(DELETE_ESTATE);
  const [updateEstate] = useMutation(UPDATE_ESTATE);
  const idClient = Router.router?.query?.id_client;

  const [idEstate, setIdEstate] = useState(null);
  const [estate, setEstate] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [search, setSearch] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);

  const handleChange = (e) => {
    e.preventDefault();
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  useEffect(async () => {
    if (idClient) {
      setSearch({ ...search, status: "Disponible" });
      await refetch({
        ...search,
        status: "Disponible",
        until: parseInt(search.until),
        since: parseInt(search.since),
      });
      await refetchTotal({
        ...search,
        status: "Disponible",
        until: parseInt(search.until),
        since: parseInt(search.since),
      });
    }
  }, [idClient]);
  const onSubmit = async (e) => {
    e.preventDefault();
    await refetch({
      ...search,
      until: parseInt(search.until),
      since: parseInt(search.since),
    });
    await refetchTotal({
      ...search,
      until: parseInt(search.until),
      since: parseInt(search.since),
    });
    setTotalPages(Math.ceil(totalEstates?.getTotalEstates / 10));
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
        action={() => console.log("hola")}
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
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                          <p className="flex gap-x-2">
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
              {dataEstates.getAllEstatesByOwner.length === 0 && (
                <div className="w-full flex justify-center py-3">
                  <p className="text-20">No se encontraron propiedades</p>
                </div>
              )}
            </div>
          </div>
          )
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
                  if (!(page + 1 >= totalpages)) setPage(page + 1);
                }}
              >
                <AiOutlineRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Estates;
