import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import NumeroALetras from "@/utils/NumeroALetras";
import dayjs from "dayjs";
const DocPdf = ({ liquidation }) => {
  return (
    <Document title="recibo">
      <Page
        size="A4"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <LiquidationDoc liquidation={liquidation} />
        <LiquidationDoc liquidation={liquidation} />
      </Page>
    </Document>
  );
};

const LiquidationDoc = ({ liquidation }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "90%",
        border: "1px solid black",
        marginTop: "40px",
      }}
    >
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottom: "1px solid black",
          borderLeft: "1px solid black",
        }}
      >
        <Text
          style={{
            padding: "3px",
            fontSize: "18px",
            textTransform: "capitalize",
          }}
        >
          Sr/a. {liquidation.full_name}
        </Text>
        <Text
          style={{
            marginRight: "10px",
            padding: "3px",
            fontSize: "18px",
          }}
        >
          {new Date(liquidation?.date).toLocaleDateString("es-AR")}
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          paddingLeft: "5px",
          marginTop: "10px",
          fontSize: "14px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Text
          style={{
            marginTop: "5px",
            fontSize: "12px",
            fontStyle: "italic",
          }}
        >
          Pago correspondiente a
          <Text
            style={{
              textTransform: "capitalize",
            }}
          >{` ${new Intl.DateTimeFormat("es-ES", {
            month: "long",
          }).format(dayjs(liquidation?.month).add(1, "day"))}`}</Text>
          {` de ${new Date(liquidation?.month).getFullYear()}`}, vivienda
          ubicada en {liquidation?.address}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            marginVertical: "15px",
            paddingRight: "5px",
          }}
        >
          <TableRow
            item={{
              title: "Monto alquiler",
              amount: liquidation?.rental_amount,
            }}
          />
          <TableRow
            item={{
              title: "Tasa Municipal",
              amount: liquidation?.rate,
            }}
          />
          <TableRow
            item={{
              title: "API",
              amount: liquidation?.api,
            }}
          />
          <TableRow
            item={{
              title: "Total percibido",
              amount:
                liquidation?.rental_amount +
                liquidation?.rate +
                liquidation?.api,
            }}
          />

          <Text
            style={{
              fontSize: "17px",
              fontWeight: "bold",
              marginTop: "10px",
              marginBottom: "10px",
              textDecoration: "underline",
            }}
          >
            DESCUENTOS
          </Text>

          {liquidation?.fee?.map((item) => (
            <TableRow
              key={item.id}
              item={{
                title: item.name,
                amount: item.amount,
              }}
            />
          ))}
          <TableRow
            item={{
              bg: true,
              title: "Total a pagar",
              amount: liquidation?.total_amount,
            }}
          />
        </View>
        {liquidation?.note && (
          <Text
            style={{
              marginTop: "5px",
              marginBottom: "10px",
            }}
          >
            Nota: {liquidation?.note}
          </Text>
        )}
      </View>
    </View>
  );
};

const TableRow = ({ item }) => {
  let styleBg = {};
  if (item.bg) {
    styleBg = { background: "#888888" };
  }
  return (
    <View
      style={{
        ...styleBg,
        display: "flex",
        flexDirection: "row",
        width: "100%",
      }}
    >
      <Text
        style={{
          width: "60%",
          border: "1px solid black",
          padding: "3px",
        }}
      >
        {item.title}
      </Text>
      <Text
        style={{
          border: "1px solid black",
          width: "40%",
          padding: "3px",
        }}
      >
        ${new Intl.NumberFormat("es-AR").format(parseInt(item.amount))}
      </Text>
    </View>
  );
};
export default DocPdf;
