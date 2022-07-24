import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";

import { FaDownload } from "react-icons/fa";

import DocPdf from "./doc-pdf";

const DownloadLiquidation = ({ liquidation }) => {
  let date = new Date(liquidation.date).toLocaleDateString("es-AR");
  return (
    <PDFDownloadLink
      document={<DocPdf liquidation={liquidation} />}
      fileName={`liquidación-${liquidation.full_name}-${date}.pdf`}
    >
      <button>
        <FaDownload className="text-20 text-tertiary hover:text-primary" />
      </button>
    </PDFDownloadLink>
  );
};

export default DownloadLiquidation;
