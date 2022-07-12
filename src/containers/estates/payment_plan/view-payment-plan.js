import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import dayjs from "dayjs";
import { GET_PAYMENT_PLAN } from "@/gql/queries/payment-plan.gql";
import { DELETE_PAYMENT_PLAN } from "@/gql/mutations/payment-plan.gql";

const ViewPaymentPlan = ({ id }) => {
  const [getPaymentPlan, { data }] = useLazyQuery(GET_PAYMENT_PLAN);
  const [deletePaymentPlan] = useMutation(DELETE_PAYMENT_PLAN);

  useEffect(() => {
    if (id) getPaymentPlan({ variables: { id } });
  }, [id]);

  return (
    <>
      {data && data.getPaymentPlan && (
        <div className="flex flex-col text-primary w-full items-center text-left gap-y-3 relative">
          <h2>
            <span className="font-bold">Cliente:</span>{" "}
            {data.getPaymentPlan.client.user.first_name +
              " " +
              data.getPaymentPlan.client.user.last_name}
          </h2>

          <p>
            <span className="font-bold">Precio:</span> $
            {data.getPaymentPlan.price}
          </p>

          <p>
            <span className="font-bold">API:</span> ${data.getPaymentPlan.api}
          </p>

          <p>
            <span className="font-bold">Aumenta cada:</span>{" "}
            {data.getPaymentPlan.increases_every + " "} meses
          </p>

          <p>
            <span className="font-bold">Entrada:</span>{" "}
            {dayjs(data.getPaymentPlan.entry).format("DD/MM/YYYY")}
          </p>

          <p>
            <span className="font-bold">Salida:</span>{" "}
            {dayjs(data.getPaymentPlan.finish).format("DD/MM/YYYY")}
          </p>

          <p>
            <span className="font-bold">Nota:</span> {data.getPaymentPlan.note}
          </p>

          <button
            className="mt-5 text-16 underline text-blue-500 font-semibold"
            onClick={async () => {
              await deletePaymentPlan({
                variables: { id: data.getPaymentPlan.id },
              });
              window.location.reload();
            }}
          >
            Liberar propiedad (Terminar plan de pago)
          </button>
        </div>
      )}
    </>
  );
};

export default ViewPaymentPlan;
