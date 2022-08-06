import { gql } from "@apollo/client";

export const GET_STATISTICS = gql`
  query GetStatistics($startDate: DateTime) {
    getStatistics(start_date: $startDate) {
      profit
      billing
      liquidated
      expenses
      net_earnings
    }
  }
`;
