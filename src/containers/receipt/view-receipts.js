import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_ALL_RECEIPTS } from "@/gql/queries/receipt.gql";
import Router from "next/router";
import DownloadPdf from "./DownloadPdf";
import { FaTrash } from "react-icons/fa";
import ModalAlert from "@/components/modal-alert";
import { DELETE_RECEIPT } from "@/gql/mutations/receipt.gql";

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
const ViewReceipts = () => {
  const [page_size, setPage_size] = useState(10);
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [idReceipt, setIdReceipt] = useState(null);
  const [getAllReceipts, { data, loading, error, refetch }] =
    useLazyQuery(GET_ALL_RECEIPTS);

  const [filters, setFilters] = useState({});

  const [deleteReceipt] = useMutation(DELETE_RECEIPT);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await refetch({
      page: page,
      pageSize: page_size,
      fullName: filters.fullName,
      month: new Date(filters.month),
    });
  };
  const handleChange = (e) => {
    e.preventDefault();
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getAllReceipts({
      variables: {
        page: 0,
        pageSize: 10,
      },
    });
  }, []);

  const columns = [
    { name: "N° Recibo", selector: "receipt_number", sortable: true },
    {
      name: "Cliente",
      selector: (d) => (
        <span className="capitalize">
          {d.client.user.first_name + " " + d.client.user.last_name}
        </span>
      ),
      sortable: false,
    },
    { name: "Monto", selector: "amount", sortable: true },
    { name: "Fecha", selector: "date", sortable: true },
    { name: "Mes", selector: "month", sortable: true },
    { name: "API", selector: "api", sortable: false },
    { name: "Tasa", selector: "rate", sortable: false },
    { name: "Recargo", selector: "surcharge", sortable: false },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="flex gap-x-4 items-center">
          <DownloadPdf receipt={row} />
          <button
            onClick={() => {
              setIdReceipt(row.id);
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
  return (
    <>
      <ModalAlert
        acceptButton={"Eliminar"}
        cancelButton={"Cancelar"}
        open={openModal}
        setOpen={setOpenModal}
        title={"Eliminar Recibo"}
        message={"¿Esta seguro que desea eliminar el recibo?"}
        action={async () => {
          await deleteReceipt({ variables: { receiptId: idReceipt } });
          refetch({ page: page, pageSize: page_size });
          setOpenModal(false);
        }}
        cancelAction={() => {
          setOpenModal(false);
        }}
      />
      <div className="w-4/5 max-w-[800px] mx-auto p-1 bg-gray-200 mt-3 flex rounded mb-2">
        <form className="w-full flex flex-col md:flex-row mx-2 gap-x-3 gap-y-3">
          <input
            type="month"
            className="rounded-full px-3 py-2"
            placeholder="Mes"
            name="month"
            onChange={handleChange}
          />

          <input
            className="rounded-full px-3 py-2"
            placeholder="cliente"
            name="fullName"
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
      <DataTable
        columns={columns}
        data={data?.getAllReceipts.results}
        responsive={true}
        pointerOnHover
        highlightOnHover
        persistTableHead
        fixedHeader
        pagination
        paginationServer
        customStyles={customStyles}
        paginationTotalRows={data?.getAllReceipts.total}
        paginationPerPage={10}
        onChangePage={(page) => {
          setPage(page);
          getAllReceipts({ variables: { page: page, pageSize: page_size } });
        }}
        onRowClicked={(row) => {
          Router.push("/receipt/" + row.id);
        }}
        onChangeRowsPerPage={(page_size, page) => {
          setPage_size(page_size);
          getAllReceipts({
            variables: {
              page: page,
              pageSize: page_size,
            },
          });
        }}
      />
    </>
  );
};

export default ViewReceipts;
