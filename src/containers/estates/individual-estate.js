import React, { useEffect } from "react";
import Router from "next/router";
import { useLazyQuery } from "@apollo/client";
import { GET_ESTATE_BY_ID } from "@/gql/queries/estate.gql";
import { IoMdReturnLeft } from "react-icons/io";

const IndividualEstate = () => {
  const id = Router?.router?.query?.id;
  const [getEstateById, { data, loading, called }] =
    useLazyQuery(GET_ESTATE_BY_ID);

  useEffect(() => {
    if (id) getEstateById({ variables: { estateId: parseInt(id) } });
  }, [id, data]);

  useEffect(() => {
    if (called && !data?.getEstate && !loading) {
      Router.push("/estates");
    }
  }, [called, data]);
  const booleanToString = (value) => {
    return value ? "Si" : "No";
  };
  return (
    <>
      <div
        className=" mt-3 ml-3 h-10 w-10 rounded-full bg-tertiary cursor-pointer flex justify-center items-center"
        onClick={() => {
          window.history.go(-1);
        }}
      >
        <IoMdReturnLeft className="text-white w-9 h-9" />
      </div>
      <div className="mx-auto text-25 flex justify-center">
        <p className="font-bold underline">Propietario: </p>
        <p className="capitalize">
          {` ${data?.getEstate?.owner?.user?.first_name} ${data?.getEstate?.owner?.user?.last_name}` ||
            "--------"}
        </p>
      </div>
      <div className="flex flex-wrap mx-4 my-2 gap-x-[30px] gap-y-[10px] justify-center">
        <div className="flex flex-col gap-y-3 rounded-md shadow-box bg-gray-100 p-4 border border-gray-400">
          <h3 className="mx-auto underline text-tertiary text-20 font-bold">
            Dirección
          </h3>
          <div className="flex">
            <p className="font-bold">Provincia:</p>
            <p>{data?.getEstate?.province || "--------"}</p>
          </div>
          <div className="flex">
            <p className="font-bold">Localidad:</p>
            <p>{data?.getEstate?.location || "--------"}</p>
          </div>
          <div className="flex">
            <p className="font-bold">Ciudad:</p>
            <p>{data?.getEstate?.city || "--------"}</p>
          </div>
          <div className="flex">
            <p className="font-bold">Barrio:</p>
            <p>{data?.getEstate?.neighborhood || "--------"}</p>
          </div>
          <div className="flex">
            <p className="font-bold">Dirección:</p>
            <p>
              {`${data?.getEstate?.address} ${data?.getEstate.address_number}` ||
                "--------"}
            </p>
          </div>
          <div className="flex">
            <p className="font-bold">Piso:</p>
            <p>{data?.getEstate?.floor || "--------"}</p>
          </div>
          <div className="flex">
            <p className="font-bold">Departamento:</p>
            <p>{data?.getEstate?.flat || "--------"}</p>
          </div>
          <div className="flex">
            <p className="font-bold">Entre calles:</p>
            <p>{data?.getEstate?.between_streets || "--------"}</p>
          </div>
        </div>

        <div className="flex flex-col gap-y-3 rounded-md shadow-box bg-gray-100 p-4 border border-gray-400">
          <h3 className="mx-auto underline text-tertiary text-20 font-bold">
            Propiedad
          </h3>
          <div className="flex">
            <p className="font-bold">Tipo de propiedad:</p>
            <p>{data?.getEstate?.type_estate || "--------"}</p>
          </div>
          <div className="flex ">
            <p className="font-bold">N° de partida:</p>
            <p>{data?.getEstate?.certificate_estate || "--------"}</p>
          </div>
          <div className="flex ">
            <p className="font-bold">N° de Dominio:</p>
            <p>{data?.getEstate?.domain || "--------"}</p>
          </div>
          <div className="flex">
            <p className="font-bold">Estado interno:</p>
            <p>{data?.getEstate?.internal_state || "--------"}</p>
          </div>
          <div className="flex ">
            <p className="font-bold">Area en m2:</p>
            <p>{data?.getEstate?.area_m2 || "--------"}</p>
          </div>
          <div className="flex ">
            <p className="font-bold">Antiguedad:</p>
            <p>{data?.getEstate?.antiquity || "--------"}</p>
          </div>
          <div className="flex ">
            <p className="font-bold">Habitaciones:</p>
            <p>{data?.getEstate?.bedrooms || "--------"}</p>
          </div>
          <div className="flex ">
            <p className="font-bold">Baños:</p>
            <p>{data?.getEstate?.bathrooms || "--------"}</p>
          </div>
          <div className="flex ">
            <p className="font-bold">Cocheras:</p>
            <p>{data?.getEstate?.garages || "--------"}</p>
          </div>
          <div className="flex ">
            <p className="font-bold">Pisos:</p>
            <p>{data?.getEstate?.floors || "--------"}</p>
          </div>
          <div className="flex ">
            <p className="font-bold">Patio:</p>
            <p>
              {data?.getEstate?.garden
                ? booleanToString(data?.getEstate?.garden)
                : "--------"}
            </p>
          </div>
          <div className="flex ">
            <p className="font-bold">Pileta:</p>
            <p>{booleanToString(data?.getEstate?.pool)}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-3 rounded-md shadow-box bg-gray-100 p-4 border border-gray-400">
          <h3 className="mx-auto underline text-tertiary text-20 font-bold">
            Otras características
          </h3>
          <div className="flex ">
            <p className="font-bold">Apto para credito:</p>
            <p>{booleanToString(data?.getEstate?.credit)}</p>
          </div>
          <div className="flex ">
            <p className="font-bold">Apto para uso comercial:</p>
            <p>{booleanToString(data?.getEstate?.commercial_use)}</p>
          </div>
          <div className="flex ">
            <p className="font-bold">Tiene cartel:</p>
            <p>{booleanToString(data?.getEstate?.has_cartel)}</p>
          </div>
          <div className="flex ">
            <p className="font-bold">Se permiten mascotas:</p>
            <p>{booleanToString(data?.getEstate?.pets)}</p>
          </div>
          <div className="flex ">
            <p className="font-bold">Orientación:</p>
            <p>{data?.getEstate?.orientation || "--------"}</p>
          </div>
          <div className="flex ">
            <p className="font-bold">Tipo de techo:</p>
            <p>{data?.getEstate?.type_ceiling || "--------"}</p>
          </div>
          <div className="flex ">
            <p className="font-bold">Iluminación:</p>
            <p>{data?.getEstate?.luminosity || "--------"}</p>
          </div>
          <div className="flex ">
            <p className="font-bold">Propiedad para:</p>
            <p>{data?.getEstate?.type || "--------"}</p>
          </div>
          <div className="flex ">
            <p className="font-bold">Estado:</p>
            <p>{data?.getEstate?.status || "--------"}</p>
          </div>
          <div className="flex ">
            <p className="font-bold">Precio:</p>
            <p>{data?.getEstate?.price || "--------"}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndividualEstate;
