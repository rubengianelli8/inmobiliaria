import React, { useEffect, useState } from "react";
import Router from "next/router";
import dayjs from "dayjs";

import { useLazyQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { GoTriangleUp } from "react-icons/go";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";

import Input from "@/components/input";
import Button from "@/components/button";

import { GET_PAYMENT_PLAN } from "@/gql/queries/payment-plan.gql";
import { ADD_LIQUIDATION } from "@/gql/mutations/liquidation.gql";

const AddLiquidation = () => {
  const id = Router.router?.query?.index;

  const [paymentPlan, setPaymentPlan] = useState();
  const [total, setTotal] = useState(0);

  const [getPaymentPlan, { data, loading: loadingPayment, called }] =
    useLazyQuery(GET_PAYMENT_PLAN);
  const [addLiquidation, { loading }] = useMutation(ADD_LIQUIDATION);

  //react-hook-form
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm({ mode: "onBlur" });

  useEffect(() => {
    if (id?.length) getPaymentPlan({ variables: { id: parseInt(id[0]) } });
  }, [id]);

  const [discounts, setDiscounts] = useState([]);
  const [newDiscount, setNewDiscount] = useState("");
  const [newDiscountAmount, setNewDiscountAmount] = useState("");
  const addDiscount = (name) => {
    if (newDiscount.length > 1 && newDiscountAmount >= 0) {
      setDiscounts([
        ...discounts,
        {
          id: discounts.length,
          amount: newDiscountAmount,
          name: newDiscount,
        },
      ]);
      setNewDiscount("");
      setNewDiscountAmount(0);
      const [rental_amount, fee, api, rate] = getValues([
        "rental_amount",
        "fee",
        "api",
        "rate",
      ]);
      calculateTotal(fee, rental_amount, api, rate);
    }
  };

  useEffect(() => {
    console.log("data", data);
    if (data?.getPaymentPlan) {
      setPaymentPlan(data.getPaymentPlan);
      setValue("rental_amount", data.getPaymentPlan.price);
      setValue(
        "full_name",
        data.getPaymentPlan.estate.owner.user.first_name +
          " " +
          data.getPaymentPlan.estate.owner.user.last_name
      );
      setValue("api", data.getPaymentPlan.api);
      setValue("date", dayjs().format("YYYY-MM-DD"));
      setValue("month", dayjs().format("YYYY-MM"));
      let fee = 0;
      fee = (data.getPaymentPlan.estate.fee * data.getPaymentPlan.price) / 100;

      setValue("fee", fee);
      setValue(
        "address",
        `${data.getPaymentPlan.estate.location}, ${data.getPaymentPlan.estate.address} ${data.getPaymentPlan.estate.address_number}`
      );
      calculateTotal(
        fee,
        data?.getPaymentPlan?.price,
        data?.getPaymentPlan?.api,
        data?.getPaymentPlan?.rate
      );
    }
  }, [data]);

  const removeDiscount = (id) => {
    setDiscounts(discounts.filter((discount) => discount.id !== id));
  };

  const handleChangeNewDiscount = (e) => {
    if (e.target.name === "newDiscount") setNewDiscount(e.target.value);
    if (e.target.name === "newDiscountAmount")
      setNewDiscountAmount(e.target.value);
  };

  const calculateTotal = (
    fee = paymentPlan?.estate.fee,
    price = paymentPlan?.price,
    api = paymentPlan?.api,
    rate = paymentPlan?.rate
  ) => {
    let total = 0;
    total = parseFloat(price) + parseFloat(api) + parseFloat(rate || 0) - fee;
    discounts.forEach((discount) => {
      total -= parseFloat(discount.amount);
    });
    setTotal(total);
  };

  useEffect(() => {
    const [rental_amount, fee, api, rate] = getValues([
      "rental_amount",
      "fee",
      "api",
      "rate",
    ]);
    calculateTotal(fee, rental_amount, api, rate);
  }),
    [watch("rental_amount"), watch("fee"), watch("api"), watch("rate")];

  const onSubmit = (e) => {
    if (!newDiscount.length) {
      discounts.unshift({
        id: discounts.length,
        amount: e.fee,
        name: "Honorarios administración",
      });
      addLiquidation({
        variables: {
          idPaymentPlan: paymentPlan.id,
          idOwner: paymentPlan.estate.owner.id,
          rentalAmount: parseInt(e.rental_amount),
          totalAmount: parseInt(total),
          api: parseInt(e.api),
          date: new Date(e.date),
          month: new Date(e.month),
          note: e.note,
          rate: e.rate ? parseInt(e.rate) : 0,
          address: e.address,
          fee: discounts,
          fullName: e.full_name,
        },
      });
    }
  };
  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="font-bold text-20 mb-6 text-tertiary underline">
        Generar Liquidación para{" "}
        <span className="text-primary capitalize">fulano</span>
      </h2>
      <form
        className="flex flex-col items-center"
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-3">
          <Input
            label={"Fecha de pago"}
            type="date"
            name="date"
            error={errors.date}
            register={register}
          />
          <Input
            label={"Nombre completo"}
            type="text"
            name="full_name"
            placeholder="Nombre Apellido"
            error={errors.date}
            register={register}
          />
          <Input
            label={"Importe"}
            type="number"
            name="rental_amount"
            placeholder="$0.00"
            error={errors.rental_amount}
            register={register}
          />
          <Input
            classPlus={"capitalize"}
            label={"Dirección de inmueble"}
            type="text"
            name="address"
            placeholder="calle 123"
            error={errors.address}
            register={register}
          />
          <Input
            label={"Corresponde a mes/año"}
            type="month"
            name="month"
            error={errors.month}
            register={register}
          />
          <Input
            label={"API"}
            type="number"
            name="api"
            placeholder="$0.00"
            error={errors.api}
            register={register}
          />
          <Input
            label={"Tasa Municipal"}
            type="number"
            name="rate"
            placeholder="$0.00"
            error={errors.rate}
            register={register}
          />
          <Input
            label={"Honorarios administración"}
            type="number"
            name="fee"
            placeholder="$0.00"
            error={errors.fee}
            register={register}
          />
          <div className="flex flex-col w-full">
            <label className="relative w-full focus:border-primary z-10">
              <span className="absolute -top-3 left-2 bg-white text-14 font-bold pl-1 pr-3 rounded text-secondary">
                Nota:
              </span>
              <textarea
                name={"note"}
                placeholder="Nota"
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
        <div className="flex mt-7">
          <label className="relative w-full focus:border-primary z-10">
            <input
              placeholder="Nombre nuevo descuento"
              name="newDiscount"
              value={newDiscount}
              onChange={handleChangeNewDiscount}
              className="border-secondary border w-full py-4 px-4 focus:outline-none focus:ring focus:ring-primary focus:mb-1 "
            />
            <span className="absolute -top-3 left-2 bg-white text-14 font-bold pl-1 pr-3 rounded text-secondary">
              Nuevo descuento
            </span>
          </label>
          <label className="relative w-2/5 focus:border-primary z-10 ml-3">
            <input
              placeholder="$00.00"
              name="newDiscountAmount"
              value={newDiscountAmount}
              type="number"
              min="0"
              onChange={handleChangeNewDiscount}
              className="border-secondary border w-full py-4 px-4 focus:outline-none focus:ring focus:ring-primary focus:mb-1 "
            />
            <span className="absolute -top-3 left-2 bg-white text-14 font-bold pl-1 pr-3 rounded text-secondary">
              Monto:
            </span>
          </label>
          <span onClick={() => addDiscount()} className="ml-3" type="button">
            <AiFillPlusCircle
              size={"40px"}
              className="text-tertiary hover:text-primary"
            />
          </span>
        </div>
        <ul className="flex flex-col w-full justify-start my-3 list-disc">
          {discounts.map((discount) => (
            <li className="w-full justify-start list-item">
              <div className="w-4/5 flex justify-between">
                <p className="text-16">
                  <span className="font-bold underline mr-3">
                    {discount.name}:
                  </span>{" "}
                  ${discount.amount}{" "}
                </p>
                <button onClick={() => removeDiscount(discount.id)}>
                  <FaTrash
                    size={"20px"}
                    className="text-tertiary hover:text-primary"
                  />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex flex-col items-center">
          <p className="text-20">Total: ${total}</p>
          {/* <div className="flex gap-x-2 mb-2 items-center">
            <Button
              type="button"
              bgColor={"bg-primary"}
              classPlus={"text-tertiary border border-tertiary"}
              label="Calcular mora"
              action={calculateSurcharge}
            />
            <h3 className="text-25 mb-3">Total: ${total}</h3>
          </div> */}
          <Button
            type="submit"
            classPlus="w-full text-18"
            label={"Generar recibo"}
            bgColor={"bg-primary"}
            disabled={false}
          />
        </div>
      </form>
    </div>
  );
};

export default AddLiquidation;
