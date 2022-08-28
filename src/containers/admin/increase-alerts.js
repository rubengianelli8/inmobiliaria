import React from "react";
import DataTable from "react-data-table-component";
import dayjs from "dayjs";
import Router from "next/router";

const customStyles = {
  headCells: {
    style: {
      fontStyle: "bold",
      fontSize: "1rem",
      backgroundColor: "#f5594e",
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
const IncreaseAlerts = ({ alerts }) => {
  const columns = [
    {
      name: "Alerta",
      selector: (row) => "Aumento",
      sorteable: false,
    },
    {
      name: "Inmueble ubicado en",
      selector: (row) => row.address + " " + row.address_number,
      sorteable: false,
    },
    {
      name: "Aumento en",
      selector: (row) =>
        `${dayjs(row.last_increase)
          .add(row.increases_every, "month")
          .format("DD/MM/YYYY")}`,
      sorteable: false,
    },
    {
      name: "Inquilino",
      selector: (row) => row.full_name,
      sorteable: false,
    },
  ];
  console.log(alerts);
  return (
    <div className="mx-3 mt-3 mb-7">
      <DataTable
        columns={columns}
        data={alerts}
        responsive={true}
        pointerOnHover
        highlightOnHover
        persistTableHead
        fixedHeader
        pagination
        customStyles={customStyles}
        paginationTotalRows={alerts?.length}
        paginationPerPage={10}
        onRowClicked={(row) => {
          Router.push(`/estates/${row.id_estate}`);
        }}
      />
    </div>
  );
};

export default IncreaseAlerts;
