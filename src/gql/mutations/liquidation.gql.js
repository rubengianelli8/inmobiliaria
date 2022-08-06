import { gql } from "@apollo/client";

export const ADD_LIQUIDATION = gql`
  mutation AddLiquidation(
    $idOwner: Int
    $idPaymentPlan: Int
    $rentalAmount: Int
    $totalAmount: Int
    $api: Int
    $date: DateTime
    $month: DateTime
    $note: String
    $fullName: String
    $rate: Int
    $totalProfit: Int
    $address: String
    $fee: JSON
  ) {
    addLiquidation(
      id_owner: $idOwner
      id_payment_plan: $idPaymentPlan
      rental_amount: $rentalAmount
      total_amount: $totalAmount
      api: $api
      date: $date
      month: $month
      note: $note
      full_name: $fullName
      rate: $rate
      address: $address
      fee: $fee
      total_profit: $totalProfit
    ) {
      id
    }
  }
`;

export const DELETE_LIQUIDATION = gql`
  mutation DeleteLiquidation($liquidationId: Int) {
    deleteLiquidation(id: $liquidationId) {
      id
    }
  }
`;
