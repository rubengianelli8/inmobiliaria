import { DateTimeTypeDefinition } from "graphql-scalars";
import { realEstate } from "./real-estate";

export const schemas = [DateTimeTypeDefinition, realEstate.schema];
