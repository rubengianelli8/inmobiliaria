import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/client";

const NavBar = () => {
  const [session, loading] = useSession();
  return (
    <div className="w-full bg-primary text-quaternary flex py-4 relative">
      <div className="absolute h-full flex top-0 items-center">
        <h2 className="text-25 uppercase text-tertiary font-serif font-bold ml-2">
          sc inmobiliaria
        </h2>
      </div>
      {!session && (
        <ul className="hidden sm:flex ml-auto md:mr-auto text-lg font-bold items-center ">
          <li className="mr-3 hover:underline">
            <Link href={"/signin"}>Iniciar sesión</Link>
          </li>
          <li className="mr-3 hover:underline">
            <Link href={"/"}>Registrarse</Link>
          </li>
        </ul>
      )}

      {session && (
        <ul className="flex ml-auto mr-auto text-lg font-bold items-center">
          <li className="mr-3 hover:underline">
            <Link href={"/signin"}>Clientes</Link>
          </li>
          <li className="mr-3 hover:underline">
            <Link href={"/owner"}>Propietarios</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default NavBar;
