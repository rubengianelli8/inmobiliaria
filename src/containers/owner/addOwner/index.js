import React from "react";
import Input from "@/components/input.js";

const AddOwner = () => {
  return (
    <div className="flex justify-center align-middle items-center h-screen mb-11">
      <form className="">
        <Input
          label={"Ingrese el email"}
          placeholder="direccion@gmail.com"
          type="text"
          name="email"
        />
        <Input
          label={"Ingrese el nombre"}
          placeholder="Nombre"
          type="text"
          name="first_name"
        />
        <Input
          label={"Ingrese el apellido"}
          placeholder="Apellido"
          type="text"
          name="last_name"
        />
      </form>
    </div>
  );
};

export default AddOwner;
