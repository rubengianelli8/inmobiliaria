import React from "react";
import Router from "next/router";
import { BsFillPencilFill } from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdOutlineAssignmentInd } from "react-icons/md";

import ViewEstates from "@/containers/owner/user/view-estates";

const UserDashboard = ({ user }) => {
  const id = Router?.router?.query?.index;
  return (
    <div className="flex">
      <div className="w-full flex justify-center">
        <ViewEstates id_client={parseInt(id)} />
      </div>
      <div className="flex justify-end w-full h-screen">
        <div className="flex flex-col border ml-auto py-3 px-6 shadow-box">
          <div className="flex flex-row text-18 mb-2">
            <span className="font-bold mr-2 text-primary">Dni:</span>
            <span>{user?.dni}</span>
          </div>
          <div className="flex flex-row text-18 mb-2">
            <span className="font-bold mr-2 text-primary">Email:</span>
            <span>{user?.email}</span>
          </div>
          <div className="flex flex-row text-18 mb-2">
            <span className="font-bold mr-2 text-primary">Nombre:</span>
            <span>{user?.first_name}</span>
          </div>
          <div className="flex flex-row text-18 mb-2">
            <span className="font-bold mr-2 text-primary">Apellido:</span>
            <span>{user?.last_name}</span>
          </div>
          <div className="flex flex-row text-18 mb-2">
            <span className="font-bold mr-2 text-primary">Direccion P:</span>
            <span>{user?.personal_address}</span>
          </div>
          <div className="flex flex-row text-18 mb-2">
            <span className="font-bold mr-2 text-primary">Direccion L:</span>
            <span>{user?.work_address}</span>
          </div>
          <div className="flex flex-row text-18 mb-2">
            <span className="font-bold mr-2 text-primary">Telefono:</span>
            <span>{user?.phone}</span>
          </div>
          <div className="flex flex-row text-18 mb-2">
            <span className="font-bold mr-2 text-primary">Celular:</span>
            <span>{user?.cell_phone}</span>
          </div>
          <div className="flex flex-col items-center gap-y-2">
            <div
              className=" text-quaternary bg-tertiary rounded-full text-14 cursor-pointer p-2 w-4/5 flex justify-center items-center"
              onClick={() => {
                Router.push(`/estates?id_client=${id}`);
              }}
            >
              <AiFillPlusCircle className="mr-2" size={20} />
              Asignar propiedad
            </div>

            <div
              className=" text-quaternary bg-tertiary rounded-full text-14 cursor-pointer p-2 w-4/5 flex justify-center items-center"
              onClick={() => {
                Router.push(`/client/add-client?id=${id}`);
              }}
            >
              <BsFillPencilFill className="mr-2" size={18} />
              Editar cliente
            </div>

            <div
              className=" text-quaternary bg-tertiary rounded-full text-14 cursor-pointer p-2 w-4/5 flex justify-center items-center"
              onClick={() => {
                Router.push(`/receipt/${id}`);
              }}
            >
              <MdOutlineAssignmentInd className="mr-2" size={20} />
              Generar recibo
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
