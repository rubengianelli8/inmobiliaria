import { merge } from "lodash";
import { DateTimeResolver } from "graphql-scalars";
import { demo } from "./demo";

export const resolvers = merge({ DateTime: DateTimeResolver }, demo.resolvers);
