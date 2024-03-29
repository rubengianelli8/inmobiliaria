import React, { useState } from "react";
import ModalComponent from "@/components/modal-component";
import ViewPaymentPlan from "@/containers/estates/payment_plan/view-payment-plan";
import PaymentPlan from "@/containers/estates/payment_plan";
import Router from "next/router";

const CardEstate = ({ estate }) => {
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [editPaymentModal, setEditPaymentModal] = useState(false);

  return (
    <>
      <ModalComponent
        cancelAction={() => setOpenPaymentModal(false)}
        title={`Plan de pago`}
        open={openPaymentModal}
        setOpen={setOpenPaymentModal}
      >
        <ViewPaymentPlan
          id={estate.id}
          setEditPaymentModal={setEditPaymentModal}
          setOpen={setOpenPaymentModal}
        />
      </ModalComponent>
      <ModalComponent
        acceptButton="Aceptar"
        cancelButton="Cancelar"
        cancelAction={() => setEditPaymentModal(false)}
        title={`Editar plan de pago`}
        open={editPaymentModal}
        setOpen={setEditPaymentModal}
      >
        <PaymentPlan
          estate={estate}
          edit={true}
          //setEstateToClient={setEstateToClient}
        />
      </ModalComponent>
      <div className="gap-y-5 flex flex-col justify-start items-start ml-10 p-3 bg-gray-100 my-3 shadow-box rounded">
        <div className="flex gap-x-10">
          <p className="flex flex-col">
            <span className="font-bold">Tipo de propiedad:</span>
            <span>{estate.type_estate}</span>
          </p>
          <div className="flex gap-x-10">
            <p className="flex flex-col">
              <span className="font-bold">Propietario:</span>
              <span className="capitalize">
                {` ${estate.owner.user.first_name} ${estate.owner.user.last_name}`}
              </span>
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
        {estate.status === "Alquilada" && (
          <div className="flex justify-between w-full">
            <button
              onClick={() => {
                setOpenPaymentModal(true);
              }}
              className="underline text-blue-500 font-semibold"
            >
              Ver plan de pago
            </button>
            <button
              onClick={() => {
                Router.push(`/liquidation/add-liquidation/${estate.id}`);
              }}
              className="underline text-blue-500 font-semibold"
            >
              Generar Liquidación
            </button>
            <button
              onClick={() => {
                Router.push(`/receipt/add-receipt/${estate.id}`);
              }}
              className="underline text-blue-500 font-semibold"
            >
              Generar recibo
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CardEstate;
