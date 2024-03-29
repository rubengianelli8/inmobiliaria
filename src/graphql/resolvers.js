import { merge } from "lodash";
import { DateTimeResolver } from "graphql-scalars";
import { realEstate } from "./real-estate";
import { user } from "./user";
import { owner } from "./owner";
import { client } from "./client";
import { estate } from "./estate";
import { paymentPlan } from "./payment-plan";
import { receipt } from "./receipt";
import { liquidation } from "./liquidation";
import { admin } from "./admin";
import { expense } from "./expense";

export const resolvers = merge(
  { DateTime: DateTimeResolver },
  realEstate.resolvers,
  user.resolvers,
  owner.resolvers,
  estate.resolvers,
  client.resolvers,
  paymentPlan.resolvers,
  receipt.resolvers,
  liquidation.resolvers,
  admin.resolvers,
  expense.resolvers
);
