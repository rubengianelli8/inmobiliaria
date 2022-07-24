import { gql } from "apollo-server-micro";

export const schema = gql`
  scalar DateTime
  scalar JSON
  type Liquidation {
    id: Int
    id_owner: Int
    id_payment_plan: Int
    rental_amount: Int
    full_name: String
    total_amount: Int
    api: Int
    date: DateTime
    month: DateTime
    note: String
    rate: Int
    address: String
    fee: JSON
    owner: Owner
    payment_plan: PaymentPlan
  }

  type ListLiquidation {
    results: [Liquidation]
    total: Int
  }

  type Query {
    getLiquidation(id: Int): Liquidation
    getAllLiquidations(page: Int, page_size: Int): ListLiquidation
  }
  type Mutation {
    addLiquidation(
      id: Int
      id_owner: Int
      id_payment_plan: Int
      rental_amount: Int
      total_amount: Int
      api: Int
      date: DateTime
      month: DateTime
      note: String
      full_name: String
      rate: Int
      address: String
      fee: JSON
    ): Liquidation
    deleteLiquidation(id: Int): Liquidation
  }
`;
