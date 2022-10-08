import { gql } from "@apollo/client";

export const ADD_PAYMENT_PLAN = gql`
  mutation AddPaymentPlan(
    $idEstate: Int
    $idClient: Int
    $rate: Int
    $price: Int
    $entry: DateTime
    $finish: DateTime
    $increasesEvery: Int
    $note: String
    $paymentDeadline: Int
    $surchargePercentage: Int
  ) {
    addPaymentPlan(
      id_estate: $idEstate
      id_client: $idClient
      rate: $rate
      price: $price
      entry: $entry
      finish: $finish
      increases_every: $increasesEvery
      note: $note
      payment_deadline: $paymentDeadline
      surcharge_percentage: $surchargePercentage
    ) {
      id
    }
  }
`;

export const UPDATE_PAYMENT_PLAN = gql`
  mutation UpdatePaymentPlan(
    $id: Int
    $rate: Int
    $price: Int
    $entry: DateTime
    $finish: DateTime
    $increasesEvery: Int
    $note: String
    $paymentDeadline: Int
    $surchargePercentage: Int
  ) {
    updatePaymentPlan(
      id: $id
      rate: $rate
      price: $price
      entry: $entry
      finish: $finish
      increases_every: $increasesEvery
      note: $note
      payment_deadline: $paymentDeadline
      surcharge_percentage: $surchargePercentage
    ) {
      id
    }
  }
`;

export const DELETE_PAYMENT_PLAN = gql`
  mutation DeletePaymentPlan($id: Int!) {
    deletePaymentPlan(id: $id) {
      id
    }
  }
`;
