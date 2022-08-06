import React, { useState, useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_STATISTICS } from "@/gql/queries/admin.gql";
import BarChart from "./bar-chart";
import PieChart from "./pie-chart";
import Expense from "./expense";
import Table from "./expense/table";
import { AiFillPlusCircle } from "react-icons/ai";
import { GET_ALL_EXPENSES } from "@/gql/queries/expense.gql";

const Admin = () => {
  const { data: dataExpenses, refetch: refetchExpenses } =
    useQuery(GET_ALL_EXPENSES);
  const [getStatistics, { data, loading, error, refetch }] =
    useLazyQuery(GET_STATISTICS);

  useEffect(() => {
    getStatistics({
      variables: {
        startDate: new Date(),
      },
    });
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const refetch_ = async () => {
    await refetch();
    await refetchExpenses();
  };
  return (
    <>
      <Expense
        openModal={openModal}
        setOpenModal={setOpenModal}
        refetch={refetch_}
      />
      <div className="m-5 flex flex-col">
        <h2 className="text-25 text-tertiary underline mb-2 text-center">
          Estadisticas de ganancias, facturación y gastos
        </h2>
        <div className="flex mx-auto">
          <p className="bg-tertiary text-primary font-bold font-20 rounded-full p-3">
            Ganancias netas: ${data?.getStatistics?.net_earnings}
          </p>
        </div>

        {data?.getStatistics.billing && (
          <div className="flex flex-col sm:flex-row items-start mt-3 gap-x-2 gap-y-2">
            <div className="w-full sm:w-2/4 shadow-box border rounded-md">
              <BarChart data={data?.getStatistics} />
            </div>
            <div className="w-full sm:w-2/4 shadow-box border rounded-md ">
              <PieChart data={data?.getStatistics} />
            </div>
          </div>
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
