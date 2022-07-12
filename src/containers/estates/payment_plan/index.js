import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PAYMENT_PLAN } from "@/gql/mutations/payment-plan.gql";

import Input from "@/components/input";
import { useForm } from "react-hook-form";
import { GoTriangleUp } from "react-icons/go";
import Button from "@/components/button";
import Router from "next/router";

const PaymentPlan = ({ estate, setEstateToClient, idClient }) => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (estate.price) setValue("price", estate.price);
  }, [estate]);

  const [addPaymentPlan, { loading }] = useMutation(ADD_PAYMENT_PLAN);

  const onSubmit = async (data) => {
    await addPaymentPlan({
      variables: {
        idEstate: estate.id,
        idClient: idClient,
        api: parseInt(data.api),
        price: parseInt(data.price),
        entry: new Date(data.entry),
        finish: new Date(data.finish),
        increasesEvery: parseInt(data.increases_every),
        note: data.note,
      },
    });
    setEstateToClient(estate.id);
    window.location.href = `/client/user/${idClient}`;
  };

  return (
    <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-y-4">
        <Input
          label={"Ingreso"}
          placeholder="Ingreso"
          type="date"
          name="entry"
          register={register}
          error={errors.entry}
        />
        <Input
          label={"Egreso"}
          placeholder="Egreso"
          type="date"
          name="finish"
          register={register}
          error={errors.finish}
        />
        <Input
          label={"Precio"}
          placeholder="$00.00"
          type="number"
          name="price"
          register={register}
          error={errors.price}
        />
        <Input
          label={"Aumento cada"}
          placeholder="Meses"
          type="number"
          name="increases_every"
          register={register}
          error={errors.increases_every}
        />
        <Input
          label={"api"}
          placeholder="api"
          type="number"
          name="api"
          register={register}
          error={errors.api}
        />
        <div className="flex flex-col w-full">
          <label className="relative w-full focus:border-primary z-10">
            <span className="absolute -top-3 left-2 bg-white text-14 font-bold pl-1 pr-3 rounded text-secondary">
              Nota:
            </span>
            <textarea
              name={"note"}
              placeholder="Observaciones"
              className={
                "border-secondary border w-full py-4 px-4 focus:outline-none focus:ring focus:ring-primary focus:mb-1"
              }
              {...register("note")}
            ></textarea>
          </label>
          {errors.note && (
            <div className="mt-2 z-20 font-roboto text-left w-9/16 ml-1 font-regular text-12 text-white flex relative justify-items-start">
              <span className="bg-red-600 inline-block z-20 w-auto p-1">
                {errors.note}
              </span>
              <GoTriangleUp
                size={"30px"}
                className="absolute -top-4 z-5 text-red-600"
              />
            </div>
          )}
        </div>
        <div>
          <Button
            type="submit"
            className="w-full"
            label={"Acepto"}
            bgColor={"bg-primary"}
            disabled={loading}
          />
        </div>
      </div>
    </form>
  );
};

export default PaymentPlan;
