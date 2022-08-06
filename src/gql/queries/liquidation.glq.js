import { gql } from "@apollo/client";

export const GET_LIQUIDATION = gql`
  query GetLiquidation($liquidationId: Int) {
    getLiquidation(id: $liquidationId) {
      id_payment_plan
      rental_amount
      full_name
      total_amount
      api
      date
      month
      note
      rate
      address
      fee
      owner {
        id
      }
    }
  }
`;

export const GET_ALL_LIQUIDATIONS = gql`
  query GetAllLiquidations(
    $page: Int
    $pageSize: Int
    $fullName: String
    $month: DateTime
  ) {
    getAllLiquidations(
      page: $page
      page_size: $pageSize
      full_name: $fullName
      month: $month
    ) {
      results {
        id
        rental_amount
        full_name
        total_amount
        api
        date
        month
        note
        address
      }
      total
    }
  }
`;
