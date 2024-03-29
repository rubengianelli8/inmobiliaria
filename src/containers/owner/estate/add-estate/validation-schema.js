import * as yup from "yup";
export const validationSchema = yup.object({
  type_estate: yup.string().required("Este campo es requerido"),
  province: yup.string().required("Este campo es requerido"),
  city: yup.string().required("Este campo es requerido"),
  location: yup.string().required("Este campo es requerido"),
  neighborhood: yup.string().notRequired(),
  address: yup.string().required("Este campo es requerido"),
  address_number: yup.string().required("Este campo es requerido"),
  floor: yup.string().notRequired(),
  flat: yup.string().notRequired(),
  internal_number: yup.string().notRequired(),
  between_streets: yup.string().notRequired(),
  internal_state: yup.string().notRequired(),
  area_m2: yup.string().required("Este campo es requerido"),
  area_m3: yup.string().notRequired(),
  antiquity: yup.string().required("Este campo es requerido"),
  bedrooms: yup.string().required("Este campo es requerido"),
  bathrooms: yup.string().required("Este campo es requerido"),
  garages: yup.string().required("Este campo es requerido"),
  floors: yup.string().required("Este campo es requerido"),
  garden: yup.string().required("Este campo es requerido"),
  pool: yup.string().required("Este campo es requerido"),
  credit: yup.string().required("Este campo es requerido"),
  commercial_use: yup.string().required("Este campo es requerido"),
  has_cartel: yup.string().required("Este campo es requerido"),
  pets: yup.string().required("Este campo es requerido"),
  orientation: yup.string().required("Este campo es requerido"),
  type_ceiling: yup.string().required("Este campo es requerido"),
  luminosity: yup.string().required("Este campo es requerido"),
  type: yup.string().required("Este campo es requerido"),
  price: yup.string().notRequired(),
  id_client: yup.string().notRequired(),
});
