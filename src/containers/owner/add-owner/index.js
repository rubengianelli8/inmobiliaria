import React, { useState } from "react";
import Router from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validation-schema";
import { useMutation } from "@apollo/client";

import { ADD_USER } from "src/gql/user.gql";
import { ADD_OWNER } from "src/gql/owner.gql";

import OwnerLayout from "@/containers/owner/owner-layout";
import Input from "@/components/input/index.js";
import Button from "@/components/button";
import ModalAlert from "@/components/modal-alert";

const AddOwner = () => {
  const [openModal, setOpenModal] = useState(false);

  // React-Hook-Form
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onBlur", resolver: yupResolver(validationSchema) });

  const [addUser, { data }] = useMutation(ADD_USER);
  const [addOwner, { data: dataOwner }] = useMutation(ADD_OWNER);
  const onSubmit = (data) => {
    addUser({
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
    }).then((res) =>
      addOwner({
        variables: {
          idUser: res.data.addUser.id,
        },
      }).then(() => {
        setOpenModal(true);
      })
    );
  };
  return (
    <>
      <ModalAlert
        title={"El propietario a sido agregado"}
        message="¿Desea cargar una propiedad?"
        acceptButton={"Cargar propiedad"}
        cancelButton="Cerrar"
        open={openModal}
        setOpen={setOpenModal}
        action={() => {
          Router.push("/owner/add-estate");
        }}
        cancelAction={() => {
          Router.push("/owner");
        }}
      />
      <OwnerLayout>
        <div className="flex justify-center h-screen mt-5">
          <form
            className="w-4/5"
            method="post"
            onSubmit={handleSubmit(onSubmit)}
          >
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
              <Button type="submit" label="Agregar" bgColor="bg-blue-500" />
            </div>
          </form>
        </div>
      </OwnerLayout>
    </>
  );
};

export default AddOwner;
