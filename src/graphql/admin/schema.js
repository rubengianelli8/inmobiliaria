import { gql } from "apollo-server-micro";

export const schema = gql`
  scalar DateTime
  type Statistics {
    profit: Int
    billing: Int
    liquidated: Int
    expenses: Int
    net_earnings: Int
  }

  type Query {
    getStatistics(start_date: DateTime): Statistics
  }
`;
