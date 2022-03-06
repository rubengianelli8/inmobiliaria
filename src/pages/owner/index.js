import React from "react";
import Router from "next/router";

import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { FiUserPlus } from "react-icons/fi";

import NavBar from "@/components/navbar";
import Owner from "@/containers/owner";

const Owners = () => {
  let path = Router?.router?.query?.path;

  if (!path) path = " ";
  return (
    <>
      <NavBar />
      <div className="bg-secondary w-250 h-screen z-50 shadow-box flex justify-center absolute">
        <nav className="w-4/5 flex flex-col mt-6">
          <ToggleGroup.Root
            type="single"
            defaultValue="addOwner"
            aria-label="Aside navigation items group"
            value={path}
            onValueChange={(value) => {
              if (value) Router.push(`/owner/?path=${value}`);
            }}
          >
            <ToggleGroup.Item
              value=" "
              aria-label="Home dashboard"
              className={
                path === " "
                  ? "p-3  rounded-full text-primary bg-quaternary flex items-center justify-center text-center"
                  : "p-3 rounded-full text-quaternary flex items-center justify-center text-center"
              }
            >
              <FiUserPlus className="w-6 h-6" />
              <p className="pl-3">Ver propietarios</p>
            </ToggleGroup.Item>

            <ToggleGroup.Item
              value="addOwner"
              aria-label="Home dashboard"
              className={
                path === "addOwner"
                  ? "p-3  rounded-full text-primary bg-quaternary flex items-center justify-center text-center"
                  : "p-3 rounded-full text-quaternary flex items-center justify-center text-center"
              }
            >
              <FiUserPlus className="w-6 h-6" />
              <p className="pl-3">Agregar propietario</p>
            </ToggleGroup.Item>
          </ToggleGroup.Root>
        </nav>
      </div>
      <div className="ml-255">
        <Owner path={path} />
      </div>
    </>
  );
};

export default Owners;
