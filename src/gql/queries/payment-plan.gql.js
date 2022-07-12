import { gql } from "@apollo/client";
export const GET_PAYMENT_PLAN = gql`
  query GetPaymentPlan($id: Int!) {
    getPaymentPlan(id: $id) {
      id
      api
      price
      entry
      finish
      increases_every
      note
      client {
        id
        user {
          first_name
          last_name
        }
      }
    }
  }
`;
