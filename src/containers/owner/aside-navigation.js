import React from "react";
import Router from "next/router";

import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { FiUserPlus } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { useState } from "react";
import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";

const AsideNavigation = () => {
  const path = Router.router?.asPath || " ";
  const [showNav, setShowNav] = useState(false);

  return (
    <aside
      className={
        !showNav
          ? "bottom-0 sm:top-[60px] h-[70px] sm:h-screen fixed w-full sm:w-20 sm:mr-10 sm:flex sm:flex-col sm:justify-center bg-secondary z-50"
          : "bottom-0 sm:top-[60px] h-[70px] sm:h-screen fixed w-full sm:w-48 sm:mr-10 sm:flex sm:flex-col sm:justify-center bg-secondary z-50"
      }
    >
      <div
        className="h-10 w-10 rounded-full bg-tertiary absolute top-1 -right-5 z-50 flex justify-center items-center cursor-pointer"
        onClick={() => setShowNav(!showNav)}
      >
        {!showNav && (
          <BsArrowBarRight
            className="text-quaternary cursor-pointer"
            size={20}
          />
        )}
        {showNav && (
          <BsArrowBarLeft
            className="text-quaternary cursor-pointer"
            size={20}
          />
        )}
      </div>
      <nav className="h-full w-full bg-secondary z-40 text-14 flex justify-center sm:justify-start items-center sm:items-start">
        <ToggleGroup.Root
          type="single"
          defaultValue="addOwner"
          aria-label="Aside navigation items group"
          value={path}
          onValueChange={(value) => {
            if (value) Router.push(`/${value}`);
          }}
          className={
            !showNav
              ? "flex sm:flex-col sm:mt-10 w-full justify-evenly sm:justify-start items-center sm:items-center px-3"
              : "flex sm:flex-col sm:mt-10 w-full justify-evenly sm:justify-start items-center sm:items-start px-3"
          }
        >
          <ToggleGroup.Item
            value="owner"
            aria-label="Home dashboard"
            className={
              path === "/owner"
                ? "p-3  rounded-full text-primary bg-quaternary flex items-center justify-center text-left"
                : "p-3 rounded-full text-quaternary flex items-center justify-center text-left"
            }
          >
            <AiOutlineUser className="w-5 h-5 sm:w-6 sm:h-6" />

            {showNav && <p className="pl-3">Ver propietarios</p>}
          </ToggleGroup.Item>

          <ToggleGroup.Item
            value="owner/add-owner"
            aria-label="Home dashboard"
            className={
              path.includes("/owner/add-owner")
                ? "p-3  rounded-full text-primary bg-quaternary flex items-center justify-center text-left"
                : "p-3 rounded-full text-quaternary flex items-center justify-center text-left"
            }
          >
            <FiUserPlus className="w-5 h-5 sm:w-6 sm:h-6" />
            {showNav && <p className="pl-3">Agregar propietario</p>}
          </ToggleGroup.Item>
        </ToggleGroup.Root>
      </nav>
    </aside>
  );
};

export default AsideNavigation;
