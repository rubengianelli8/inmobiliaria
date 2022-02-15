import { merge } from "lodash";
import { DateTimeResolver } from "graphql-scalars";
import { realEstate } from "./real-estate";

export const resolvers = merge(
  { DateTime: DateTimeResolver },
  realEstate.resolvers
);
