import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { GiHamburgerMenu } from "react-icons/gi";

const NavBar = () => {
  const [session, loading] = useSession();
  const [showNav, setShowNav] = useState(false);
  const path = useRouter().pathname;
  return (
    <div className="w-full bg-primary text-quaternary flex py-4 fixed top-0 h-[60px] z-50">
      <div className="absolute h-full flex top-0 items-center">
        <h2 className="text-20 md:text-25 uppercase text-tertiary font-serif font-bold ml-2">
          sc inmobiliaria
        </h2>
      </div>
      {!session && (
        <ul className="flex ml-auto md:mr-auto text-lg font-bold items-center ">
          <li className="mr-3 hover:underline">
            <Link href={"/signin"}>Iniciar sesión</Link>
          </li>
          {/* <li className="mr-3 hover:underline">
            <Link href={"/"}>Registrarse</Link>
          </li> */}
        </ul>
      )}

      {session && (
        <ul className="hidden lg:flex ml-auto text-lg font-bold items-center">
          <li
            className={`mr-3 hover:underline ${
              path.includes("client") && "text-tertiary"
            }`}
          >
            <Link href={"/client"}>Inquilinos</Link>
          </li>
          <li
            className={`mr-3 hover:underline ${
              path.includes("owner") && "text-tertiary"
            }`}
          >
            <Link href={"/owner"}>Propietarios</Link>
          </li>
          <li
            className={`mr-3 hover:underline ${
              path.includes("estates") && "text-tertiary"
            }`}
          >
            <Link href={"/estates"}>Propiedades</Link>
          </li>
          <li
            className={`mr-3 hover:underline ${
              path.includes("receipt") && "text-tertiary"
            }`}
          >
            <Link href={"/receipt/list"}>Pagos</Link>
          </li>
          <li
            className={`mr-3 hover:underline ${
              path.includes("liquidation") && "text-tertiary"
            }`}
          >
            <Link href={"/liquidation/list"}>Liquidaciones</Link>
          </li>
          <li
            className={`mr-3 hover:underline ${
              path.includes("admin") && "text-tertiary"
            }`}
          >
            <Link href={"/admin"}>Administración</Link>
          </li>
        </ul>
      )}
      {session && (
        <button
          onClick={() => {
            setShowNav(!showNav);
          }}
          className="ml-auto my-auto mr-3 flex lg:hidden"
        >
          <GiHamburgerMenu size={30} className="text-white" />
        </button>
      )}
      {showNav && session && (
        <ul className="z-50 flex flex-col bg-primary lg:hidden mx-auto text-lg font-bold items-center absolute top-[60px]  w-screen">
          <li
            className={`mr-3 hover:underline ${
              path.includes("client") && "text-tertiary"
            }`}
          >
            <Link href={"/client"}>Inquilinos</Link>
          </li>
          <li
            className={`mr-3 hover:underline ${
              path.includes("owner") && "text-tertiary"
            }`}
          >
            <Link href={"/owner"}>Propietarios</Link>
          </li>
          <li
            className={`mr-3 hover:underline ${
              path.includes("estates") && "text-tertiary"
            }`}
          >
            <Link href={"/estates"}>Propiedades</Link>
          </li>
          <li
            className={`mr-3 hover:underline ${
              path.includes("receipt") && "text-tertiary"
            }`}
          >
            <Link href={"/receipt/list"}>Pagos</Link>
          </li>
          <li
            className={`mr-3 hover:underline ${
              path.includes("liquidation") && "text-tertiary"
            }`}
          >
            <Link href={"/liquidation/list"}>Liquidaciones</Link>
          </li>
          <li
            className={`mr-3 hover:underline ${
              path.includes("admin") && "text-tertiary"
            }`}
          >
            <Link href={"/admin"}>Administración</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default NavBar;
