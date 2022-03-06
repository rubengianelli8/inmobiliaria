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

        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-6xl font-bold">
            Welcome to{" "}
            <a className="text-blue-600" href="https://nextjs.org">
              ¡Nuevo Proyecto!
            </a>
          </h1>
        </main>
      </div>
    </>
  );
}
