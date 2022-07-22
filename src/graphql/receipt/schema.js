import { gql } from "apollo-server-micro";

export const schema = gql`
  scalar DateTime
  type Receipt {
    id: Int
    id_client: Int
    receipt_number: Int
    id_payment_plan: Int
    amount: Int
    api: Int
    date: DateTime
    month: DateTime
    note: String
    surcharge: Int
    surcharge_percentage: Int
    rate: Int
    address: String
    client: Client
    payment_plan: PaymentPlan
  }

  type ListReceipts {
    results: [Receipt]
    total: Int
  }

  type Query {
    getReceipt(id: Int): Receipt
    getAllReceipts(page: Int, page_size: Int): ListReceipts
    countReceiptByClient(id_client: Int): Int
  }
  type Mutation {
    addReceipt(
      id_client: Int
      id_payment_plan: Int
      receipt_number: Int
      amount: Int
      api: Int
      date: DateTime
      month: DateTime
      note: String
      surcharge: Int
      surcharge_percentage: Int
      rate: Int
      address: String
    ): Receipt
    deleteReceipt(id: Int): Receipt
  }
`;
