import React, { useEffect, useState } from "react";
import Router from "next/router";
import dayjs from "dayjs";

import { useLazyQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { GoTriangleUp } from "react-icons/go";

import Input from "@/components/input";
import Button from "@/components/button";
import { GET_PAYMENT_PLAN } from "@/gql/queries/payment-plan.gql";
import { ADD_RECEIPT } from "@/gql/mutations/receipt.gql";
import { COUNT_RECEIPT_BY_CLIENT } from "@/gql/queries/receipt.gql";

const AddReceipt = () => {
  const [total, setTotal] = useState(0);
  const id = Router.router?.query?.index;

  const [getPaymentPlan, { data, loading: loadingPayment, called }] =
    useLazyQuery(GET_PAYMENT_PLAN);
  const [addReceipt, { loading }] = useMutation(ADD_RECEIPT);
  const [countReceiptByClient, { data: countData }] = useLazyQuery(
    COUNT_RECEIPT_BY_CLIENT
  );

  const [surchargeState, setSurchargeState] = useState(0);
  const [paymentPlan, setPaymentPlan] = useState({});
  // React-Hook-Form
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

  useEffect(() => {
    if (data?.getPaymentPlan) {
      countReceiptByClient({
        variables: { idClient: data.getPaymentPlan.client.id },
      });
      setPaymentPlan(data.getPaymentPlan);
      setValue("amount", data.getPaymentPlan.price);
      setValue(
        "full_name",
        data.getPaymentPlan.client.user.first_name +
          " " +
          data.getPaymentPlan.client.user.last_name
      );
      setValue("api", data.getPaymentPlan.api);
      setValue("date", dayjs().format("YYYY-MM-DD"));
      setValue("month", dayjs().format("YYYY-MM"));
      setValue(
        "address",
        `${data.getPaymentPlan.estate.location}, ${data.getPaymentPlan.estate.address} ${data.getPaymentPlan.estate.address_number}`
      );
      let price =
        parseFloat(data.getPaymentPlan.price) +
        parseFloat(data.getPaymentPlan.api);
      setTotal(price);
    }
  }, [data]);

  useEffect(() => {
    const [amount, api, rate] = getValues(["amount", "api", "rate"]);
    let newAmount = amount ? parseFloat(amount) : 0;
    let newApi = api ? parseFloat(api) : 0;
    let newRate = rate ? parseFloat(rate) : 0;
    let price = newAmount + newApi + newRate + surchargeState;
    setTotal(price);
  }, [watch("amount"), watch("api"), watch("rate")]);

  const calculateSurcharge = () => {
    const [surcharge_days, surcharge_percentage, amount, api, rate] = getValues(
      ["surcharge_days", "surcharge_percentage", "amount", "api", "rate"]
    );

    let newAmount = amount ? parseFloat(amount) : 0;
    let newApi = api ? parseFloat(api) : 0;
    let newRate = rate ? parseFloat(rate) : 0;
    let price = newAmount + newApi + newRate;

    const surcharge_total_percentage = surcharge_days * surcharge_percentage;
    setSurchargeState((newAmount * surcharge_total_percentage) / 100);
    const newPrice = price + (newAmount * surcharge_total_percentage) / 100;
    setTotal(newPrice);
  };

  const redirect = () => {
    alert("No se encontr?? el plan de pago");
    Router.push("/client");
  };

  const onSubmit = async (e) => {
    addReceipt({
      variables: {
        receiptNumber: countData.countReceiptByClient + 1,
        idClient: paymentPlan.client.id,
        idPaymentPlan: paymentPlan.id,
        amount: parseInt(total),
        api: parseInt(e.api),
        date: new Date(e.date),
        month: new Date(e.month),
        note: e.note,
        surcharge: surchargeState,
        surchargePercentage: parseInt(e.surcharge_percentage),
        rate: e.rate ? parseInt(e.rate) : 0,
        address: e.address,
      },
    }).then((res) => {
      Router.push(`/receipt/${res.data.addReceipt.id}`);
    });
  };

  return (
    <div className="flex flex-col items-center mt-5">
      {!loadingPayment && called && !data.getPaymentPlan && redirect()}

      {!loading && called && data?.getPaymentPlan && (
        <>
          {" "}
          <h2 className="font-bold text-20 mb-6 text-tertiary underline">
            Generar recibo{" "}
            {countData ? (
              <span className="text-primary">
                N??{countData?.countReceiptByClient + 1}
              </span>
            ) : (
              ""
            )}{" "}
            para{" "}
            <span className="text-primary">
              {data?.getPaymentPlan?.client?.user?.first_name
                ? `${data?.getPaymentPlan?.client?.user?.first_name} ${data?.getPaymentPlan?.client?.user?.last_name}`
                : "cliente"}
            </span>
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
                name="amount"
                placeholder="$0.00"
                error={errors.amount}
                register={register}
              />
              <Input
                classPlus={"capitalize"}
                label={"Direcci??n de inmueble"}
                type="text"
                name="address"
                placeholder="calle 123"
                error={errors.address}
                register={register}
              />
              <Input
                label={"Corresponde a mes/a??o"}
                type="month"
                name="month"
                error={errors.month}
                register={register}
              />
              <Input
                label={"D??as de mora"}
                type="number"
                name="surcharge_days"
                placeholder="0"
                error={errors.surcharge_days}
                register={register}
              />
              <Input
                label={"Porcentaje de mora/d??a"}
                type="number"
                name="surcharge_percentage"
                placeholder="0"
                error={errors.surcharge_percentage}
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
            <div className="flex flex-col items-center">
              <div className="flex gap-x-2 mb-2 items-center">
                <Button
                  type="button"
                  bgColor={"bg-primary"}
                  classPlus={"text-tertiary border border-tertiary"}
                  label="Calcular mora"
                  action={calculateSurcharge}
                />
                <h3 className="text-25 mb-3">Total: ${total}</h3>
              </div>
              <Button
                type="submit"
                classPlus="w-full text-18"
                label={"Generar recibo"}
                bgColor={"bg-primary"}
                disabled={loading}
              />
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default AddReceipt;
