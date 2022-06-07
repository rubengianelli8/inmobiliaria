import React from "react";

const CardEstate = ({ estate }) => {
  return (
    <div className="gap-y-5 flex flex-col justify-start items-start w-4/5 max-w-[500px] p-3 bg-gray-100 my-3 shadow-box rounded">
      <div className="flex gap-x-10">
        <p className="flex flex-col">
          <span className="font-bold">Tipo de propiedad:</span>
          <span>{estate.type_estate}</span>
        </p>
        <div className="flex gap-x-10">
          <p className="flex flex-col">
            <span className="font-bold">Propietario:</span>
            <span className="capitalize">{` ${estate.owner.user.first_name} ${estate.owner.user.last_name}`}</span>
          </p>
          <p className="flex flex-col">
            <span className="font-bold">Inquilino:</span>
            <span>
              {estate?.client
                ? ` ${estate?.client?.user?.first_name} ${estate?.client?.user.last_name}`
                : "-----"}
            </span>
          </p>
        </div>
      </div>
      <div className="flex">
        <p className="flex flex-col">
          <span className="font-bold">Dirección:</span>
          <span className="capitalize">{`${estate.province}, ${estate.location}, ${estate.address}, ${estate.address_number}`}</span>
        </p>
      </div>
      <div className="flex gap-x-10">
        <p className="flex flex-col">
          <span className="font-bold">Precio:</span>
          <span>{estate?.price ? ` $${estate.price}` : "Sin definir"}</span>
        </p>
        <p className="flex flex-col">
          <span className="font-bold">Para:</span>
          <span>{estate.type}</span>
        </p>
        <p className="flex flex-col">
          <span className="font-bold">Estado</span>
          <span>{estate.status}</span>
        </p>
      </div>
    </div>
  );
};

export default CardEstate;
