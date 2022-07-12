import { gql } from "@apollo/client";

export const ADD_PAYMENT_PLAN = gql`
  mutation AddPaymentPlan(
    $idEstate: Int
    $idClient: Int
    $api: Int
    $price: Int
    $entry: DateTime
    $finish: DateTime
    $increasesEvery: Int
    $note: String
  ) {
    addPaymentPlan(
      id_estate: $idEstate
      id_client: $idClient
      api: $api
      price: $price
      entry: $entry
      finish: $finish
      increases_every: $increasesEvery
      note: $note
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
