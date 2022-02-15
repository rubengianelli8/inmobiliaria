import { merge } from "lodash";
import { DateTimeResolver } from "graphql-scalars";

export const resolvers = merge({ DateTime: DateTimeResolver });
