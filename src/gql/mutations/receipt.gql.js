import { gql } from "@apollo/client";

export const ADD_RECEIPT = gql`
  mutation AddReceipt(
    $idClient: Int
    $idPaymentPlan: Int
    $amount: Int
    $api: Int
    $date: DateTime
    $month: DateTime
    $note: String
    $surcharge: Int
    $surchargePercentage: Int
    $rate: Int
    $address: String
    $receiptNumber: Int
    $fullName: String
  ) {
    addReceipt(
      id_client: $idClient
      id_payment_plan: $idPaymentPlan
      amount: $amount
      api: $api
      date: $date
      month: $month
      note: $note
      surcharge: $surcharge
      surcharge_percentage: $surchargePercentage
      rate: $rate
      address: $address
      receipt_number: $receiptNumber
      full_name: $fullName
    ) {
      id
    }
  }
`;

export const DELETE_RECEIPT = gql`
  mutation Mutation($receiptId: Int) {
    deleteReceipt(id: $receiptId) {
      id
    }
  }
`;
