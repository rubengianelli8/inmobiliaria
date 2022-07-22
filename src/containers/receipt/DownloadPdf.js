import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";

import { FaDownload } from "react-icons/fa";

import DocPdf from "../doc-pdf";

const DownloadPdf = ({ receipt }) => {
  return (
    <PDFDownloadLink
      document={<DocPdf receipt={receipt} />}
      fileName={`recibo-${receipt.client.user.last_name}-${receipt.date}.pdf`}
    >
      <button>
        <FaDownload className="text-20 text-tertiary hover:text-primary" />
      </button>
    </PDFDownloadLink>
  );
};

export default DownloadPdf;
