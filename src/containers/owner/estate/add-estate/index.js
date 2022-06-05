import React, { useEffect, useState } from "react";
import Router from "next/router";
import { useMutation, useLazyQuery } from "@apollo/client";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validation-schema.js";

import ModalAlert from "@/components/modal-alert";

import {
  TYPE_OF_ESTATE,
  STATE_ESTATE,
  TYPE_OF_CEILING,
  LUMINOSITY,
  INTERNAL_STATE,
  ORIENTATION,
  YES_OR_NO,
  STATUS,
} from "./constants";

import { ADD_ESTATE, UPDATE_ESTATE } from "@/gql/mutations/estate.gql.js";
import { GET_ESTATE_BY_ID } from "@/gql/queries/estate.gql.js";
import Input from "@/components/input";
import Button from "@/components/button";
import SelectComponent from "@/components/select";

const AddEstate = () => {
  const id_owner = Router?.router?.query?.id_owner;
  const id_estate = Router?.router?.query?.id_estate;

  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const [addEstate] = useMutation(ADD_ESTATE);
  const [updateEstate] = useMutation(UPDATE_ESTATE);
  const [getEstateById, { data: dataEstate }] = useLazyQuery(GET_ESTATE_BY_ID);

  useEffect(() => {
    if (id_estate) {
      getEstateById({
        variables: {
          estateId: parseInt(id_estate),
        },
      });
    }
  }, [id_estate]);

  useEffect(() => {
    if (dataEstate?.getEstate) {
      setValue("type_estate", dataEstate?.getEstate?.type_estate || "");
      setValue("province", dataEstate?.getEstate?.province || "");
      setValue("city", dataEstate?.getEstate?.city || "");
      setValue("location", dataEstate?.getEstate?.location || "");
      setValue("neighborhood", dataEstate?.getEstate?.neighborhood || "");
      setValue("address", dataEstate?.getEstate?.address || "");
      setValue("address_number", dataEstate?.getEstate?.address_number || "");
      setValue("floor", dataEstate?.getEstate?.floor || "");
      setValue("flat", dataEstate?.getEstate?.flat || "");
      setValue("internal_number", dataEstate?.getEstate?.internal_number || "");
      setValue("between_streets", dataEstate?.getEstate?.between_streets || "");
      setValue("internal_state", dataEstate?.getEstate?.internal_state || "");
      setValue("area_m2", dataEstate?.getEstate?.area_m2 || "");
      setValue("area_m3", dataEstate?.getEstate?.area_m3 || "");
      setValue("bedrooms", dataEstate?.getEstate?.bedrooms || "");
      setValue("antiquity", dataEstate?.getEstate?.antiquity || "");
      setValue("bathrooms", dataEstate?.getEstate?.bathrooms || "");
      setValue("garages", dataEstate?.getEstate?.garages || "");
      setValue("floors", dataEstate?.getEstate?.floors || "");
      setValue("garden", dataEstate?.getEstate?.garden ? "Si" : "No");
      setValue("pool", dataEstate?.getEstate?.pool ? "Si" : "No");
      setValue("credit", dataEstate?.getEstate?.credit ? "Si" : "No");
      setValue(
        "commercial_use",
        dataEstate?.getEstate?.commercial_use ? "Si" : "No"
      );
      setValue("has_cartel", dataEstate?.getEstate?.has_cartel ? "Si" : "No");
      setValue("pets", dataEstate?.getEstate?.pets ? "Si" : "No");
      setValue("orientation", dataEstate?.getEstate?.orientation || "");
      setValue("type_ceiling", dataEstate?.getEstate?.type_ceiling || "");
      setValue("luminosity", dataEstate?.getEstate?.luminosity || "");
      setValue("type", dataEstate?.getEstate?.type || "");
      setValue("status", dataEstate?.getEstate?.status || "");
      setValue("price", dataEstate?.getEstate?.price || "");
    }
  }, [dataEstate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      type_estate: "",
      type: "",
      type_ceiling: "",
      luminosity: "",
      internal_state: "",
      orientation: "",
      has_cartel: "",
      pets: "",
      credit: "",
      commercial_use: "",
      pool: "",
      garden: "",
      status: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const toBoolean = (value) => {
    if (value === "Si") {
      return true;
    }
    return false;
  };
  const onSubmitAddEstate = (data) => {
    console.log({
      ...data,
      idEstate: parseInt(id_estate),
      garden: toBoolean(data.garden),
      pool: toBoolean(data.pool),
      credit: toBoolean(data.credit),
      commercial_use: toBoolean(data.commercial_use),
      has_cartel: toBoolean(data.has_cartel),
      pets: toBoolean(data.pets),
      area_m2: parseInt(data.area_m2),
      area_m3: parseInt(data.area_m3),
      bedrooms: parseInt(data.bedrooms),
      bathrooms: parseInt(data.bathrooms),
      garages: parseInt(data.garages),
      floors: parseInt(data.floors),
      antiquity: parseInt(data.antiquity),
      id_owner: parseInt(id_owner),
      price: parseInt(1),
      status: data.status,
    });
    if (!id_estate) {
      console.log("add");
      addEstate({
        variables: {
          ...data,
          garden: toBoolean(data.garden),
          pool: toBoolean(data.pool),
          credit: toBoolean(data.credit),
          commercial_use: toBoolean(data.commercial_use),
          has_cartel: toBoolean(data.has_cartel),
          pets: toBoolean(data.pets),
          area_m2: parseInt(data.area_m2),
          area_m3: parseInt(data.area_m3),
          bedrooms: parseInt(data.bedrooms),
          bathrooms: parseInt(data.bathrooms),
          garages: parseInt(data.garages),
          floors: parseInt(data.floors),
          antiquity: parseInt(data.antiquity),
          id_owner: parseInt(id_owner),
          status: data.status,
          price: parseInt(data.price),
        },
      }).then((res) => {
        setTitle("Propiedad agregada");
        setMessage("La propiedad ha sido agregada correctamente");
        setOpenModal(true);
      });
    } else {
      console.log("update");
      updateEstate({
        variables: {
          ...data,
          idEstate: parseInt(id_estate),
          garden: toBoolean(data.garden),
          pool: toBoolean(data.pool),
          credit: toBoolean(data.credit),
          commercial_use: toBoolean(data.commercial_use),
          has_cartel: toBoolean(data.has_cartel),
          pets: toBoolean(data.pets),
          area_m2: parseInt(data.area_m2),
          area_m3: parseInt(data.area_m3),
          bedrooms: parseInt(data.bedrooms),
          bathrooms: parseInt(data.bathrooms),
          garages: parseInt(data.garages),
          floors: parseInt(data.floors),
          antiquity: parseInt(data.antiquity),
          id_owner: parseInt(id_owner),
          status: data.status,
          price: parseInt(data.price),
        },
      }).then((res) => {
        setTitle("Propiedad actualizada");
        setMessage("La propiedad ha sido actualizada correctamente");
        setOpenModal(true);
      });
    }
  };
  return (
    <>
      <ModalAlert
        title={title}
        message={message}
        acceptButton={"Aceptar"}
        isDialog={true}
        open={openModal}
        setOpen={setOpenModal}
        action={() => {
          Router.push("/owner/add-estate");
        }}
        cancelAction={() => {
          Router.push("/owner/add-estate");
        }}
      />
      <div className="w-full flex justify-center mt-5">
        <form
          onSubmit={handleSubmit(onSubmitAddEstate)}
          className="w-full md:w-4/5 flex flex-col justify-center"
        >
          <h2 className="font-bold text-20 text-primary md:text-30 mb-10 text-center ">
            Cargar una propiedad
          </h2>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-2">
            <SelectComponent
              data={TYPE_OF_ESTATE}
              label="Tipo de Propiedad"
              placeholder="Seleccione el tipo de propiedad"
              control={control}
              Controller={Controller}
              register={register}
              name="type_estate"
              error={errors.type_estate}
            />
            <Input
              type="text"
              label="Precio"
              name={"price"}
              placeholder="AR$00.00"
              register={register}
              error={errors.price}
            />
            <Input
              type="text"
              label="Dpto"
              name={"flat"}
              placeholder="Departamento"
              register={register}
              error={errors.flat}
            />
            <Input
              type="text"
              label="Piso"
              name={"floor"}
              placeholder="Piso"
              register={register}
              error={errors.floor}
            />
            <Input
              type="text"
              label="Interno"
              name={"internal_number"}
              placeholder="Interno"
              register={register}
              error={errors.internal_number}
            />
            <Input
              type="text"
              label="Entre calles"
              name={"between_streets"}
              placeholder="Entre calles"
              register={register}
              error={errors.between_streets}
            />
            <Input
              type="text"
              label="Provincia"
              name={"province"}
              placeholder="Provincia"
              register={register}
              error={errors.province}
            />
            <Input
              type="text"
              label="Localidad"
              name={"location"}
              placeholder="Localidad"
              register={register}
              error={errors.location}
            />
            <Input
              type="text"
              label="Ciudad"
              name={"city"}
              placeholder="Ciudad"
              register={register}
              error={errors.city}
            />
            <Input
              type="text"
              label="Barrio"
              name={"neighborhood"}
              placeholder="Barrio"
              register={register}
              error={errors.neighborhood}
            />
            <Input
              type="text"
              label="Dirección"
              name={"address"}
              placeholder="Dirección"
              register={register}
              error={errors.address}
            />
            <Input
              type="text"
              label="Número"
              name={"address_number"}
              placeholder="Número"
              register={register}
              error={errors.address_number}
            />
            <Input
              type="number"
              label="Sup. mts cuad"
              name={"area_m2"}
              placeholder="Superficie en metros cuadrados"
              register={register}
              error={errors.area_m2}
            />
            <Input
              type="number"
              label="Sup. mts cub"
              name={"area_m3"}
              placeholder="Superficie en metros cubicos"
              register={register}
              error={errors.area_m3}
            />
            <Input
              type="number"
              label="Antiguedad"
              name={"antiquity"}
              placeholder="Antiguedad en años"
              register={register}
              error={errors.antiquity}
            />
            <Input
              type="number"
              label="Dormitorios"
              name={"bedrooms"}
              placeholder="Cantidad de dormitorios"
              register={register}
              error={errors.bedrooms}
            />
            <Input
              type="number"
              label="Baños"
              name={"bathrooms"}
              placeholder="Cantidad de baños"
              register={register}
              error={errors.bathrooms}
            />
            <Input
              type="number"
              label="Cocheras"
              name={"garages"}
              placeholder="Cantidad de cocheras"
              register={register}
              error={errors.garages}
            />
            <Input
              type="number"
              label="Plantas"
              name={"floors"}
              placeholder="Cantidad de plantas"
              register={register}
              error={errors.floors}
            />
            <SelectComponent
              data={ORIENTATION}
              label="Orientación"
              placeholder="Seleccione la orientación"
              control={control}
              Controller={Controller}
              register={register}
              name="orientation"
              error={errors.orientation}
            />
            <SelectComponent
              data={TYPE_OF_CEILING}
              label="Tipo de techo"
              placeholder="Seleccione el tipo de techo"
              control={control}
              Controller={Controller}
              register={register}
              name="type_ceiling"
              error={errors.type_ceiling}
            />
            <SelectComponent
              data={STATE_ESTATE}
              label="Tipo de Propiedad"
              placeholder="Seleccione el tipo de propiedad"
              control={control}
              Controller={Controller}
              register={register}
              name="type"
              error={errors.type}
            />
            <SelectComponent
              data={LUMINOSITY}
              label="Luminosidad"
              placeholder="Seleccionar la luminosidad"
              control={control}
              Controller={Controller}
              register={register}
              name="luminosity"
              error={errors.luminosity}
            />
            <SelectComponent
              data={INTERNAL_STATE}
              label="Estado interno"
              placeholder="Seleccione el estado interno"
              control={control}
              Controller={Controller}
              register={register}
              name="internal_state"
              error={errors.internal_state}
            />
            <SelectComponent
              data={STATUS}
              label="Estado"
              placeholder="Seleccionar"
              control={control}
              Controller={Controller}
              register={register}
              name="status"
              error={errors.status}
            />
            <SelectComponent
              data={YES_OR_NO}
              label="Patio"
              placeholder="Seleccionar"
              control={control}
              Controller={Controller}
              register={register}
              name="garden"
              error={errors.garden}
            />
            <SelectComponent
              data={YES_OR_NO}
              label="Piscina"
              placeholder="Seleccionar"
              control={control}
              Controller={Controller}
              register={register}
              name="pool"
              error={errors.pool}
            />

            <SelectComponent
              data={YES_OR_NO}
              label="Apto para credito"
              placeholder="Seleccionar"
              control={control}
              Controller={Controller}
              register={register}
              name="credit"
              error={errors.credit}
            />

            <SelectComponent
              data={YES_OR_NO}
              label="Uso comercial"
              placeholder="Seleccionar"
              control={control}
              Controller={Controller}
              register={register}
              name="commercial_use"
              error={errors.commercial_use}
            />
            <SelectComponent
              data={YES_OR_NO}
              label="Tiene cartel"
              placeholder="Seleccionar"
              control={control}
              Controller={Controller}
              register={register}
              name="has_cartel"
              error={errors.has_cartel}
            />
            <SelectComponent
              data={YES_OR_NO}
              label="¿Se permiten mascotas?"
              placeholder="Seleccionar"
              control={control}
              Controller={Controller}
              register={register}
              name="pets"
              error={errors.pets}
            />
          </div>
          <div className="mt-3 mx-auto grid grid-cols-2 gap-x-4 mb-10">
            <Button label={"Aceptar"} bgColor={"bg-tertiary"} />
            <Button
              label={"Cancelar"}
              type="button"
              bgColor={"bg-red-500"}
              action={() => Router.push(`/owner/user/${id_owner}`)}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddEstate;
