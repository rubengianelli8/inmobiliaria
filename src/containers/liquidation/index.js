import React from "react";

import DocPdf from "./doc-pdf";

import { PDFViewer } from "@react-pdf/renderer";

const Liquidation = ({ liquidation }) => {
  return (
    <PDFViewer className="w-screen h-screen">
      <DocPdf liquidation={liquidation} />
    </PDFViewer>
  );
};

export default Liquidation;
