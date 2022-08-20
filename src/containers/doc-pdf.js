import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import NumeroALetras from "@/utils/NumeroALetras";
import dayjs from "dayjs";

const DocPdf = ({ receipt }) => {
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
        <ReceiptDoc receipt={receipt} />
      </Page>
      <Page
        size="A4"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <ReceiptDoc receipt={receipt} />
      </Page>
    </Document>
  );
};

const ReceiptDoc = ({ receipt }) => {
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
          width: "auto",
          display: "flex",
          flexDirection: "row",
          marginLeft: "auto",
          borderBottom: "1px solid black",
          borderLeft: "1px solid black",
        }}
      >
        <Text
          style={{
            marginRight: "10px",
            padding: "3px",
            fontSize: "18px",
          }}
        >
          {new Date(receipt?.date).toLocaleDateString("es-AR")}
        </Text>

        <Text
          style={{
            padding: "3px",
            fontSize: "18px",
          }}
        >
          Recibo N° {receipt?.receipt_number}
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          backgroundColor: "#d2d4d6",
          paddingVertical: "4px",
          marginTop: "5px",
        }}
      >
        <Text
          style={{
            marginLeft: "5px",
          }}
        >
          Recibi del Sr.{" "}
          <Text
            style={{
              textTransform: "capitalize",
            }}
          >{`${receipt?.client?.user.first_name} ${receipt?.client?.user.last_name}`}</Text>
          :
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
        <Text>
          La cantidad de {(" ", NumeroALetras(receipt?.amount))}, son $
          {new Intl.NumberFormat("es-AR").format(receipt?.amount)}
        </Text>
        <Text
          style={{
            marginTop: "5px",
            fontSize: "12px",
            fontStyle: "italic",
          }}
        >
          Por el alquiler del inmueble ubicado en: {receipt?.address}{" "}
          correspondiente al mes de{" "}
          {new Intl.DateTimeFormat("es-ES", { month: "long" }).format(
            dayjs(receipt?.month).add(1, "day")
          )}
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
          <View
            style={{
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
              Importe:
            </Text>
            <Text
              style={{
                border: "1px solid black",
                width: "40%",
                padding: "3px",
              }}
            >
              $
              {new Intl.NumberFormat("es-AR").format(
                receipt?.amount -
                  receipt?.api -
                  receipt?.rate -
                  receipt?.surcharge
              )}
            </Text>
          </View>
          <View
            style={{
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
              Recargos por mora:({calculateSurchargePercentage(receipt)}%)
            </Text>
            <Text
              style={{
                border: "1px solid black",
                width: "40%",
                padding: "3px",
              }}
            >
              ${new Intl.NumberFormat("es-AR").format(receipt?.surcharge)}
            </Text>
          </View>
          <View
            style={{
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
              API:
            </Text>
            <Text
              style={{
                border: "1px solid black",
                width: "40%",
                padding: "3px",
              }}
            >
              ${new Intl.NumberFormat("es-AR").format(receipt?.api)}
            </Text>
          </View>
          <View
            style={{
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
              Tasa Municipal:
            </Text>
            <Text
              style={{
                border: "1px solid black",
                width: "40%",
                padding: "3px",
              }}
            >
              ${new Intl.NumberFormat("es-AR").format(receipt?.rate)}
            </Text>
          </View>
          <View
            style={{
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
                backgroundColor: "#d2d4d6",
              }}
            >
              Total:
            </Text>
            <Text
              style={{
                border: "1px solid black",
                width: "40%",
                padding: "3px",
                backgroundColor: "#d2d4d6",
              }}
            >
              ${new Intl.NumberFormat("es-AR").format(receipt?.amount)}
            </Text>
          </View>
        </View>
        {receipt?.note && (
          <Text
            style={{
              marginTop: "5px",
              marginBottom: "10px",
            }}
          >
            Nota: {receipt?.note}
          </Text>
        )}
      </View>
    </View>
  );
};

const calculateSurchargePercentage = (receipt) => {
  const amount =
    receipt?.amount - receipt?.api - receipt?.rate - receipt?.surcharge;
  return (receipt?.surcharge / amount) * 100;
};
export default DocPdf;
