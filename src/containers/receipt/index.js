import React from "react";

import DocPdf from "../doc-pdf";

import { PDFViewer } from "@react-pdf/renderer";

const Receipt = ({ receipt }) => {
  return (
    <PDFViewer className="w-screen h-screen">
      <DocPdf receipt={receipt} />
    </PDFViewer>
  );
};

export default Receipt;
