import * as yup from "yup";
export const validationSchema = yup.object({
  email: yup
    .string()
    .email("Ingrese un email valido")
    .required("Este campo es obligatorio"),
  first_name: yup
    .string()
    .min(2, "El minimo es de 2 caracteres")
    .max(30, "El maximo es de 30 caracteres"),
  last_name: yup
    .string()
    .min(2, "El minimo es de 2 caracteres")
    .max(30, "El maximo es de 30 caracteres")
    .required("Este campo es obligatorio"),
  dni: yup
    .string("Solo puede ingresar numeros")
    .min(7, "El minimo es de 7 caracteres")
    .max(8, "El maximo es de 8 caracteres")
    .required("Este campo es obligatorio"),
  personal_address: yup
    .string()
    .min(3, "El minimo es de 3 caracteres")
    .max(50, "El maximo es de 50 caracteres")
    .required("Este campo es obligatorio"),
  work_address: yup
    .string()
    .max(50, "El maximo es de 50 caracteres")
    .notRequired(),
  phone: yup.string().max(12, "El maximo de numeros ingresados debe ser de 12"),
  cell_phone: yup
    .string()
    .max(12, "El maximo de numeros ingresados debe ser de 12"),
});
