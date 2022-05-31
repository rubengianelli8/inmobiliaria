import React from "react";
import Router from "next/router";

import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { FiUserPlus } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";

const AsideNavigation = () => {
  const path = Router.router?.asPath;

  return (
    <div className="bg-secondary w-250 h-screen z-50 shadow-box md:flex justify-center hidden md:absolute">
      <nav className="w-4/5 flex flex-col mt-6">
        <ToggleGroup.Root
          type="single"
          defaultValue="addOwner"
          aria-label="Aside navigation items group"
          value={path}
          onValueChange={(value) => {
            if (value) Router.push(`/${value}`);
          }}
        >
          <ToggleGroup.Item
            value="owner"
            aria-label="Home dashboard"
            className={
              path === "/owner"
                ? "p-3  rounded-full text-primary bg-quaternary flex items-center justify-center text-center"
                : "p-3 rounded-full text-quaternary flex items-center justify-center text-center"
            }
          >
            <AiOutlineUser className="w-6 h-6" />
            <p className="pl-3">Ver propietarios</p>
          </ToggleGroup.Item>

          <ToggleGroup.Item
            value="owner/add-owner"
            aria-label="Home dashboard"
            className={
              path.includes("/owner/add-owner")
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
  );
};

export default AsideNavigation;
