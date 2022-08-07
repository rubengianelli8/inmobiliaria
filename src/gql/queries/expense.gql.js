import { gql } from "@apollo/client";

export const GET_ALL_EXPENSES = gql`
  query GetAllExpenses($month: DateTime) {
    getAllExpenses(month: $month) {
      expenses {
        amount
        note
        month
        id
      }
      total
    }
  }
`;
