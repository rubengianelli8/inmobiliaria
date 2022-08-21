import { gql } from "@apollo/client";

export const ADD_CLIENT = gql`
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
    addClient(
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

export const UPDATE_CLIENT = gql`
  mutation Mutation(
    $idClient: Int
    $email: String
    $firstName: String
    $lastName: String
    $dni: Int
    $personalAddress: String
    $workAddress: String
    $phone: String
    $cellPhone: String
  ) {
    updateClient(
      id_client: $idClient
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

export const DELETE_CLIENT = gql`
  mutation DeleteClient($clientId: Int) {
    deleteClient(id: $clientId) {
      id
    }
  }
`;
