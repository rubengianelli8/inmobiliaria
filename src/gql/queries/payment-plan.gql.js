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
      surcharge_percentage
      payment_deadline
      estate {
        address
        address_number
        location
        fee
        owner {
          id
          user {
            first_name
            last_name
          }
        }
      }
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
