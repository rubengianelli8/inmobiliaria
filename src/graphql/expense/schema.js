import { gql } from "apollo-server-micro";

export const schema = gql`
  scalar DateTime
  type Expense {
    id: Int
    amount: Int
    note: String
    month: DateTime
  }

  type ListExpenses {
    expenses: [Expense]
    total: Int
  }

  type Query {
    getExpense(id: Int!): Expense
    getAllExpenses: ListExpenses
  }
  type Mutation {
    addExpense(amount: Int!, note: String, month: DateTime!): Expense
    deleteExpense(id: Int!): Expense
  }
`;
