import * as yup from "yup";
export const validationSchema = yup.object({
  price: yup.string().required("Este campo es obligatorio"),
  entry: yup.string().required("Este campo es obligatorio"),
  finish: yup.string().required("Este campo es obligatorio"),
  increases_every: yup.string().required("Este campo es obligatorio"),
  paymentDeadline: yup.string().required("Este campo es obligatorio"),
});
