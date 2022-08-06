import { gql } from "@apollo/client";

export const ADD_EXPENSE = gql`
  mutation Mutation($amount: Int!, $month: DateTime!, $note: String) {
    addExpense(amount: $amount, month: $month, note: $note) {
      id
    }
  }
`;

export const DELETE_EXPENSE = gql`
  mutation DeleteExpense($deleteExpenseId: Int!) {
    deleteExpense(id: $deleteExpenseId) {
      id
    }
  }
`;
