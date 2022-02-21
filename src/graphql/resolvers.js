import { merge } from "lodash";
import { DateTimeResolver } from "graphql-scalars";
import { realEstate } from "./real-estate";
import { user } from "./user";
import { owner } from "./owner";

export const resolvers = merge(
  { DateTime: DateTimeResolver },
  realEstate.resolvers,
  user.resolvers,
  owner.resolvers
);
