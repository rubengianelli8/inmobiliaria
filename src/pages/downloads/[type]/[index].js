import React, { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useLazyQuery } from "@apollo/client";
import { GET_RECEIPT_BY_ID } from "@/gql/queries/receipt.gql";

import { FaDownload } from "react-icons/fa";

import DocPdf from "@/containers/doc-pdf.js";
import Router from "next/router";
import DownloadPdf from "@/containers/receipt/DownloadPdf";

const index = () => {
  const index = Router.router?.query?.index;
  const type = Router.router?.query?.type;

  const [getReceiptById, { data }] = useLazyQuery(GET_RECEIPT_BY_ID);
  useEffect(() => {
    if (type && type !== "receipt") {
      Router.push("/404");
    }
    if (index && type === "receipt") {
      getReceiptById({
        variables: {
          receiptId: parseInt(Buffer.from(index, "base64").toString("ascii")),
        },
      });
    }
  }, [type, index]);
  return (
    <>
      {data?.getReceipt && (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
          <h2 className="text-20 underline mb-3">Aquí esta tu recibo</h2>
          <PDFDownloadLink
            document={<DocPdf receipt={data.getReceipt} />}
            fileName={`recibo-${data.getReceipt.client.user.last_name}-${data.getReceipt.date}.pdf`}
          >
            <button className="flex items-center gap-x-2 text-primary bg-tertiary p-3 rounded font-bold text-25 hover:bg-primary hover:text-tertiary">
              Descargar Recibo
              <span>
                <FaDownload className="text-25" />
              </span>
            </button>
          </PDFDownloadLink>
        </div>
      )}
    </>
  );
};

export default index;
