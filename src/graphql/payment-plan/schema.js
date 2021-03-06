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
    ): PaymentPlan
    deletePaymentPlan(id: Int): PaymentPlan
  }
`;
