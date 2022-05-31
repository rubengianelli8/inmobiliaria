import { DateTimeTypeDefinition } from "graphql-scalars";
import { realEstate } from "./real-estate";
import { user } from "./user";
import { owner } from "./owner";
import { estate } from "./estate";

export const schemas = [
  DateTimeTypeDefinition,
  realEstate.schema,
  user.schema,
  owner.schema,
  estate.schema,
];
