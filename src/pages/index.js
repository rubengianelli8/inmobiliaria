import Head from "next/head";
import Link from "next/link";
import NavBar from "@/components/navbar";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Head>
          <title>Nuevo Proyecto</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex justify-center items-center">
          <img
            className="w-screen h-full object-cover fixed top-0 right-0 opacity-100 brightness-75"
            src="https://www.criptonoticias.com/wp-content/uploads/2020/07/inmobiliaria-interes-especialista-blockchain.jpg"
          ></img>
          <div className="z-40 text-center text-white">
            <h2 className="uppercase text-3xl md:text-5xl font-bold">
              Lo hacemos por vos
            </h2>
            <p className="mt-3 text-18 md:text-2xl">
              Administramos el alquiler de tu propiedad
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
