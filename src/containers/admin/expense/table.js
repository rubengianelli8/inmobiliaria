import React, { useState } from "react";
import dayjs from "dayjs";

import { DELETE_EXPENSE } from "@/gql/mutations/expense.gql";
import { useMutation } from "@apollo/client";
import { FaTrash } from "react-icons/fa";
import DataTable from "react-data-table-component";
import ModalAlert from "@/components/modal-alert";
import ModalComponent from "@/components/modal-component";

const Table = ({ refetchStatistics, data, refetch }) => {
  const [deleteExpense] = useMutation(DELETE_EXPENSE);

  const [openModal, setOpenModal] = useState(false);
  const [openExpense, setOpenExpense] = useState(false);
  const [idExpense, setIdExpense] = useState(null);
  const [dataExpense, setDataExpense] = useState(null);
  const customStyles = {
    headCells: {
      style: {
        fontStyle: "bold",
        fontSize: "1rem",
        backgroundColor: "#e8e8e8",
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
    footer: {
      style: {
        color: "#000000",
      },
    },
  };

  const columns = [
    { name: "Monto", selector: "amount", sortable: true },
    {
      name: "Mes",
      selector: (d) =>
        new Intl.DateTimeFormat("es-ES", { month: "long" })
          .format(dayjs(d.month).add(1, "day"))
          .toUpperCase(),
      sortable: true,
    },
    { name: "Nota", selector: (d) => d.note.split(40), sortable: true },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="flex gap-x-4 items-center">
          <button
            onClick={() => {
              setIdExpense(row.id);
              setOpenModal(true);
            }}
          >
            <FaTrash className="text-20 text-tertiary hover:text-primary" />
          </button>
        </div>
      ),
      button: true,
      ignoreRowClick: true,
    },
  ];

  const deleteExpenseFunction = (id) => {
    deleteExpense({
      variables: {
        deleteExpenseId: id,
      },
    }).then(async () => {
      await refetch();
      await refetchStatistics();
      setOpenModal(false);
    });
  };

  return (
    <>
      <ModalAlert
        acceptButton="Eliminar"
        cancelButton="Cancelar"
        title="Eliminar gasto"
        message="¿Estas seguro de eliminar este gasto?"
        open={openModal}
        setOpen={setOpenModal}
        action={() => {
          deleteExpenseFunction(idExpense);
        }}
        cancelAction={() => {
          setOpenModal(false);
        }}
      />
      <ModalComponent
        title="Detalle del gasto"
        open={openExpense}
        setOpen={setOpenExpense}
      >
        <div className="flex flex-col gap-y-3">
          <p>
            <span className="text-primary">Monto:</span> ${dataExpense?.amount}
          </p>
          {dataExpense?.month && (
            <p>
              <span className="text-primary">Mes:</span>{" "}
              {new Intl.DateTimeFormat("es-ES", { month: "long" })
                .format(dayjs(dataExpense?.month).add(1, "day"))
                .toUpperCase()}
            </p>
          )}
          <p>
            <span className="text-primary">Nota:</span>{" "}
            <span>{dataExpense?.note}</span>
          </p>
        </div>
      </ModalComponent>
      <DataTable
        columns={columns}
        data={data?.getAllExpenses.expenses}
        responsive={true}
        pointerOnHover
        highlightOnHover
        persistTableHead
        fixedHeader
        pagination
        customStyles={customStyles}
        paginationTotalRows={data?.getAllExpenses.total}
        paginationPerPage={10}
        onRowClicked={(row) => {
          setDataExpense(row);
          setOpenExpense(true);
        }}
      />
    </>
  );
};

export default Table;
