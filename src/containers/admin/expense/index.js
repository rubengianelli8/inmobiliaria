import React from "react";
import { useMutation } from "@apollo/client";

import { useForm } from "react-hook-form";
import { validationSchema } from "./validation-schema";

import { yupResolver } from "@hookform/resolvers/yup";
import { GoTriangleUp } from "react-icons/go";

import Button from "@/components/button";
import Input from "@/components/input";
import ModalComponent from "@/components/modal-component";

import { ADD_EXPENSE } from "@/gql/mutations/expense.gql";
const Expense = ({ openModal, setOpenModal, refetch }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({ mode: "onBlur", resolver: yupResolver(validationSchema) });

  const onSubmit = (data) => {
    addExpense({
      variables: {
        amount: parseInt(data.amount),
        month: new Date(data.month),
        note: data.note,
      },
    }).then(async () => {
      await refetch();
      setOpenModal(false);
    });
  };

  const [addExpense, { data }] = useMutation(ADD_EXPENSE);
  return (
    <ModalComponent
      open={openModal}
      setOpen={setOpenModal}
      title="Agregar Gasto"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-4">
          <Input
            name="amount"
            error={errors.amount}
            label="Monto"
            placeholder="$00.00"
            type="number"
            register={register}
          />
          <Input
            name="month"
            error={errors.month}
            label="Mes"
            type="month"
            register={register}
          />
          <div className="flex flex-col w-full">
            <label className="relative w-full focus:border-primary z-10">
              <span className="absolute -top-3 left-2 bg-white text-14 font-bold pl-1 pr-3 rounded text-secondary">
                Nota:
              </span>
              <textarea
                name={"note"}
                placeholder="Nota referente a el gasto"
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
        </div>
        <div className="flex flex-row mx-auto justify-between mt-2">
          <Button type="submit" label="agregar" bgColor="bg-tertiary" />
          <Button
            type="button"
            label="cancelar"
            bgColor="bg-primary"
            classPlus="text-white"
            action={() => setOpenModal(false)}
          />
        </div>
      </form>
    </ModalComponent>
  );
};

export default Expense;
