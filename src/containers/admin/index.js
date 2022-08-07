import React, { useState, useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_STATISTICS } from "@/gql/queries/admin.gql";
import BarChart from "./bar-chart";
import PieChart from "./pie-chart";
import Expense from "./expense";
import Table from "./expense/table";
import { AiFillPlusCircle } from "react-icons/ai";
import { GET_ALL_EXPENSES } from "@/gql/queries/expense.gql";
import dayjs from "dayjs";
const Admin = () => {
  const [getExpenses, { data: dataExpenses, refetch: refetchExpenses }] =
    useLazyQuery(GET_ALL_EXPENSES);
  const [getStatistics, { data, loading, error, refetch }] =
    useLazyQuery(GET_STATISTICS);
  const [filters, setFilters] = useState({ month: new Date() });

  useEffect(() => {
    getStatistics({
      variables: {
        startDate: new Date(),
      },
    });
    getExpenses({
      variables: {
        month: new Date(),
      },
    });
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const refetch_ = async () => {
    await refetch({
      startDate: new Date(dayjs(filters.month).add(1, "day")),
    });
    await refetchExpenses({
      month: new Date(dayjs(filters.month).add(1, "day")),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    refetch_();
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Expense
        openModal={openModal}
        setOpenModal={setOpenModal}
        refetch={refetch_}
      />
      <div className="w-4/5 max-w-[800px] mx-auto p-1 bg-gray-200 mt-3 flex rounded mb-2">
        <form className="w-full flex flex-col md:flex-row mx-2 gap-x-3 gap-y-3">
          <input
            type="month"
            className="rounded-full px-3 py-2"
            placeholder="Mes"
            defaultValue={new Date()}
            name="month"
            onChange={handleChange}
          />

          <button
            onClick={handleSubmit}
            className="ml-auto bg-tertiary py-2 px-3 rounded mb-1 md:mb-0"
          >
            Filtrar
          </button>
        </form>
      </div>
      <div className="m-5 flex flex-col">
        <h2 className="text-25 text-tertiary underline mb-2 text-center">
          Estadisticas de ganancias, facturación y gastos
        </h2>
        <div className="flex mx-auto">
          <p className="bg-tertiary text-primary font-bold font-20 rounded-full p-3">
            Ganancias netas: ${data?.getStatistics?.net_earnings}
          </p>
        </div>

        {data?.getStatistics?.billing && !loading ? (
          <div className="flex flex-col sm:flex-row items-start mt-3 gap-x-2 gap-y-2">
            <div className="w-full sm:w-2/4 shadow-box border rounded-md">
              <BarChart data={data?.getStatistics} />
            </div>
            <div className="w-full sm:w-2/4 shadow-box border rounded-md ">
              <PieChart data={data?.getStatistics} />
            </div>
          </div>
        ) : loading ? (
          <h4 className="text-center text-gray-600 text-20 underline">
            Cargando...
          </h4>
        ) : (
          <h3 className="text-center text-gray-600 text-20 underline">
            No hay facturación en el mes seleccionado.
          </h3>
        )}

        <div className="flex gap-x-3 my-4 mx-auto items-center">
          <h2 className="text-25 text-tertiary underline text-center">
            Gastos
          </h2>
          <AiFillPlusCircle
            className="text-tertiary text-3xl cursor-pointer"
            onClick={() => {
              setOpenModal(true);
            }}
          />
        </div>

        <Table
          refetchStatistics={refetch}
          data={dataExpenses}
          refetch={refetchExpenses}
        />
      </div>
    </>
  );
};

export default Admin;
