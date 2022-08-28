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

export const GET_INCREASE_ALERTS = gql`
  query GetIncreaseAlerts {
    getIncreaseAlerts {
      id
      id_estate
      last_increase
      address
      address_number
      city
      province
      increases_every
      full_name
    }
  }
`;
