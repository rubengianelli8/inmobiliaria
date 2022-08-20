import { gql } from "apollo-server-micro";

export const schema = gql`
  type PaymentPlan {
    id: Int
    id_estate: Int
    id_client: Int
    api: Int
    price: Int
    entry: DateTime
    finish: DateTime
    increases_every: Int
    note: String
    deleted: Boolean
    payment_deadline: DateTime
    surcharge_percentage: Int
    estate: Estate
    client: Client
  }

  type Query {
    getPaymentPlan(id: Int!): PaymentPlan
  }
  type Mutation {
    addPaymentPlan(
      id_estate: Int
      api: Int
      price: Int
      entry: DateTime
      finish: DateTime
      increases_every: Int
      note: String
      id_client: Int
      deleted: Boolean
      payment_deadline: Int
      surcharge_percentage: Int
    ): PaymentPlan
    updatePaymentPlan(
      id: Int
      id_estate: Int
      api: Int
      price: Int
      entry: DateTime
      finish: DateTime
      increases_every: Int
      note: String
      id_client: Int
      deleted: Boolean
      payment_deadline: DateTime
      surcharge_percentage: Int
    ): PaymentPlan
    deletePaymentPlan(id: Int): PaymentPlan
  }
`;
