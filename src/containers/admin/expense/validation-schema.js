import * as yup from "yup";
export const validationSchema = yup.object({
  amount: yup.string().required("Este campo es obligatorio"),
  month: yup.string().required("Este campo es obligatorio"),
});
