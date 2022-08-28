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

  type increaseAlert {
    id: Int
    id_estate: Int
    last_increase: DateTime
    address: String
    address_number: String
    city: String
    province: String
    increases_every: Int
    full_name: String
  }

  type Query {
    getStatistics(start_date: DateTime): Statistics
    getIncreaseAlerts: [increaseAlert]
  }
`;
