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

  const [deleteReceipt] = useMutation(DELETE_RECEIPT);

  useEffect(() => {
    getAllReceipts({
      variables: {
        page: 0,
        pageSize: 10,
      },
    });
  }, []);

  const columns = [
    { name: "Numero", selector: "receipt_number", sortable: true },
    { name: "Cliente", selector: "client.user.first_name", sortable: false },
    { name: "Monto", selector: "amount", sortable: true },
    { name: "Fecha", selector: "date", sortable: true },
    { name: "mes", selector: "month", sortable: true },
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
