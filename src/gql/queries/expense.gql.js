import { gql } from "@apollo/client";

export const GET_ALL_EXPENSES = gql`
  query GetAllExpenses {
    getAllExpenses {
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
