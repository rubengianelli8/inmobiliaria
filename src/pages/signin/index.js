import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/client";
import Router from "next/router";

import NavBar from "@/components/navbar";
import Input from "@/components/input.js";
import Button from "@/components/button";

const signin = () => {
  const [session, loading] = useSession();
  const [user, setUser] = useState({});
  const [error, setError] = useState({ ok: true, message: "" });

  useEffect(() => {
    if (session) Router.push("/");
  }, [session]);

  const handleChange = (e) => {
    console.log(e);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    signIn("credentials", {
      redirect: false,
      email: user.email,
      password: user.password,
      callbackUrl: "http://localhost:3000/",
    }).then((res) => {
      if (res.ok) Router.push(res.url);
      else {
        setError({
          ok: res.ok,
          message: "El email o la contraseña ingresada no son validos",
        });
      }
    });
  };

  return (
    <div className="h-screen">
      <NavBar />
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col max-w-400 w-10/12 border border-blue-300 p-8 shadow-box mt-16"
        >
          {!error.ok && (
            <span className="text-red-600 font-bold">{error.message}</span>
          )}
          <div className="flex justify-center">
            <span className="text-black text-xl text-center">
              Iniciar sesión como administrador
            </span>
          </div>
          <div className="mt-5">
            <Input
              label={"Ingresa tu email"}
              placeholder="tuemail@email.com"
              type="text"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="mt-5">
            <Input
              label={"Ingresa tu contraseña"}
              placeholder="contraseña"
              type="password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center mt-5">
            <Button type="submit" label="Iniciar sesión" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default signin;
