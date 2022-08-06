import React, { useState, useEffect } from "react";
import Router from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validation-schema";
import { useMutation, useLazyQuery } from "@apollo/client";

import { ADD_USER } from "src/gql/user.gql";
import { ADD_OWNER } from "src/gql/owner.gql";
import { GET_OWNER } from "src/gql/owner.gql";
import { UPDATE_OWNER } from "src/gql/owner.gql";

import OwnerLayout from "@/containers/owner/owner-layout";
import Input from "@/components/input/index.js";
import Button from "@/components/button";
import ModalAlert from "@/components/modal-alert";

const AddOwner = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [idOwner, setIdOwner] = useState(null);

  const [getUserOwner, { data: dataUserOwner }] = useLazyQuery(GET_OWNER);
  const [updateUser] = useMutation(UPDATE_OWNER);
  const [addUser, { data }] = useMutation(ADD_USER);
  const [addOwner, { data: dataOwner }] = useMutation(ADD_OWNER);
  const id = Router.router?.query?.id;

  useEffect(() => {
    if (id) {
      getUserOwner({
        variables: {
          getOwnerId: parseInt(id),
        },
      });
    }
  }, [id]);

  // React-Hook-Form
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({ mode: "onBlur", resolver: yupResolver(validationSchema) });

  useEffect(() => {
    if (dataUserOwner?.getOwner?.user) {
      setValue("email", dataUserOwner.getOwner.user.email);
      setValue("first_name", dataUserOwner.getOwner.user.first_name);
      setValue("last_name", dataUserOwner.getOwner.user.last_name);
      setValue("dni", dataUserOwner.getOwner.user.dni);
      setValue(
        "personal_address",
        dataUserOwner.getOwner.user.personal_address
      );
      setValue(
        "work_address",
        dataUserOwner.getOwner.user.work_address || undefined
      );
      setValue("phone", dataUserOwner.getOwner.user.phone || undefined);
      setValue(
        "cell_phone",
        dataUserOwner.getOwner.user.cell_phone || undefined
      );
    }
  }, [dataUserOwner]);

  const onSubmit = (data) => {
    if (!id)
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
        }).then((res_) => {
          setIdOwner(res_.data.addOwner.id);
          setOpenModal(true);
        })
      );
    else {
      updateUser({
        variables: {
          id: parseInt(id),
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
        title={"El propietario a sido agregado"}
        message="¿Desea cargar una propiedad?"
        acceptButton={"Cargar propiedad"}
        cancelButton="Cerrar"
        open={openModal}
        setOpen={setOpenModal}
        action={() => {
          Router.push("/owner/user/add-estate?id_owner=" + idOwner);
        }}
        cancelAction={() => {
          Router.push("/owner");
        }}
      />
      <ModalAlert
        title={"El propietario a sido actualizado"}
        message=""
        acceptButton={"Aceptar"}
        open={openModalUpdate}
        setOpen={setOpenModalUpdate}
        isDialog={true}
        action={() => {
          Router.push("/owner/user/" + id);
        }}
      />
      <OwnerLayout>
        <div className="flex justify-center h-screen mt-5">
          <form
            className="w-4/5"
            method="post"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-3">
              {!id ? (
                <h2>Agregar dueño de propiedad</h2>
              ) : (
                <h2>Actualizar dueño de propiedad</h2>
              )}
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
      </OwnerLayout>
    </>
  );
};

export default AddOwner;
