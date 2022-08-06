import React, { useState, useEffect, useInsertionEffect } from "react";
import Router from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validation-schema";
import { useMutation, useLazyQuery } from "@apollo/client";

import { ADD_CLIENT, UPDATE_CLIENT } from "src/gql/mutations/client.gql";
import { GET_CLIENT } from "src/gql/queries/client.gql";

import ClientLayout from "@/containers/client/client-layout";
import Input from "@/components/input/index.js";
import Button from "@/components/button";
import ModalAlert from "@/components/modal-alert";

const AddClient = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [idClient, setIdClient] = useState(null);

  const [getUserClient, { data: dataUserClient }] = useLazyQuery(GET_CLIENT);
  const [updateUser] = useMutation(UPDATE_CLIENT);
  const [addClient, { data: dataClient }] = useMutation(ADD_CLIENT);
  const id = Router.router?.query?.id;

  useEffect(() => {
    if (id) {
      getUserClient({
        variables: {
          idClient: parseInt(id),
        },
      });
    }
  }, [id]);

  useEffect(() => {
    if (dataClient?.addClient?.id) {
      setIdClient(dataClient.addClient.id);
      setOpenModal(true);
    }
  }, [dataClient]);

  // React-Hook-Form
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({ mode: "onBlur", resolver: yupResolver(validationSchema) });

  useEffect(() => {
    if (dataUserClient?.getClient) {
      setValue("email", dataUserClient.getClient.email);
      setValue("first_name", dataUserClient.getClient.first_name);
      setValue("last_name", dataUserClient.getClient.last_name);
      setValue("dni", dataUserClient.getClient.dni);
      setValue("personal_address", dataUserClient.getClient.personal_address);
      setValue(
        "work_address",
        dataUserClient.getClient.work_address || undefined
      );
      setValue("phone", dataUserClient.getClient.phone || undefined);
      setValue("cell_phone", dataUserClient.getClient.cell_phone || undefined);
    }
  }, [dataUserClient]);

  const onSubmit = async (data) => {
    if (!id)
      await addClient({
        variables: {
          email: data.email,
          firstName: data.first_name,
          lastName: data.last_name,
          dni: parseInt(data.dni),
          personalAddress: data.personal_address,
          workAddress: data.work_address,
          phone: data.phone,
          cellPhone: data.cell_phone,
        },
      });
    else {
      updateUser({
        variables: {
          idClient: parseInt(id),
          email: data.email,
          firstName: data.first_name,
          lastName: data.last_name,
          dni: parseInt(data.dni),
          personalAddress: data.personal_address,
          workAddress: data.work_address,
          phone: data.phone,
          cellPhone: data.cell_phone,
        },
      }).then(() => {
        setOpenModalUpdate(true);
      });
    }
  };
  return (
    <>
      <ModalAlert
        title={"El cliente a sido agregado"}
        message="¿Desea agregarle una propiedad?"
        acceptButton={"Cargar propiedad"}
        cancelButton="Cerrar"
        open={openModal}
        setOpen={setOpenModal}
        action={() => {
          Router.push("/estates?id_client=" + idClient);
        }}
        cancelAction={() => {
          Router.push("/client");
        }}
      />
      <ModalAlert
        title={"El cliente a sido actualizado"}
        message=""
        acceptButton={"Aceptar"}
        open={openModalUpdate}
        setOpen={setOpenModalUpdate}
        isDialog={true}
        action={() => {
          Router.push("/client/user/" + id);
        }}
        cancelAction={() => {
          Router.push("/client");
        }}
      />
      <ClientLayout>
        <div className="flex justify-center h-screen mt-5">
          <form
            className="w-4/5"
            method="post"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-3 text-20">
              {!id ? <h2>Agregar cliente</h2> : <h2>Actualizar cliente</h2>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-5">
              <div>
                <Input
                  label={"Ingrese el email"}
                  placeholder="direccion@gmail.com"
                  type="text"
                  name="email"
                  register={register}
                  error={errors.email}
                />
              </div>
              <div>
                <Input
                  label={"Ingrese el nombre"}
                  placeholder="Nombre"
                  type="text"
                  name="first_name"
                  register={register}
                  error={errors.first_name}
                />
              </div>
              <div>
                <Input
                  label={"Ingrese el apellido"}
                  placeholder="Apellido"
                  type="text"
                  name="last_name"
                  register={register}
                  error={errors.last_name}
                />
              </div>
              <div>
                <Input
                  label={"DNI"}
                  placeholder="12345678"
                  type="number"
                  name="dni"
                  register={register}
                  error={errors.dni}
                />
              </div>
              <div>
                <Input
                  label={"Dirección personal"}
                  placeholder="tu direccion 123"
                  type="text"
                  name="personal_address"
                  register={register}
                  error={errors.personal_address}
                />
              </div>
              <div>
                <Input
                  label={"Dirección laboral"}
                  placeholder="tu direccion 123"
                  type="text"
                  name="work_address"
                  register={register}
                  error={errors.work_address}
                />
              </div>
              <div>
                <Input
                  label={"Telefono"}
                  placeholder="3408670000"
                  type="number"
                  name="phone"
                  register={register}
                  error={errors.phone}
                />
              </div>
              <div>
                <Input
                  label={"Celular"}
                  placeholder="3408670000"
                  type="number"
                  name="cell_phone"
                  register={register}
                  error={errors.cell_phone}
                />
              </div>
            </div>
            <div className="mt-2 flex justify-center">
              <Button
                type="submit"
                label={id ? "Actualizar" : "Agregar"}
                bgColor="bg-tertiary"
              />
            </div>
          </form>
        </div>
      </ClientLayout>
    </>
  );
};

export default AddClient;
