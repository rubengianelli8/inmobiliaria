import { DateTimeTypeDefinition } from "graphql-scalars";
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

export const schemas = [
  DateTimeTypeDefinition,
  realEstate.schema,
  user.schema,
  owner.schema,
  estate.schema,
  client.schema,
  paymentPlan.schema,
  receipt.schema,
  liquidation.schema,
  admin.schema,
  expense.schema,
];
