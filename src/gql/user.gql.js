import { gql } from "apollo-server-micro";

export const ADD_USER = gql`
  mutation Mutation(
    $email: String
    $firstName: String
    $lastName: String
    $dni: Int
    $personalAddress: String
    $workAddress: String
    $phone: String
    $cellPhone: String
  ) {
    addUser(
      email: $email
      first_name: $firstName
      last_name: $lastName
      dni: $dni
      personal_address: $personalAddress
      work_address: $workAddress
      phone: $phone
      cell_phone: $cellPhone
    ) {
      id
    }
  }
`;
