import { gql } from "apollo-server-micro";

export const ADD_OWNER = gql`
  mutation AddOwner($idUser: Int) {
    addOwner(id_user: $idUser) {
      id
    }
  }
`;

export const UPDATE_OWNER = gql`
  mutation Mutation(
    $id: Int
    $email: String
    $firstName: String
    $lastName: String
    $dni: Int
    $personalAddress: String
    $workAddress: String
    $phone: String
    $cellPhone: String
  ) {
    updateOwner(
      id: $id
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

export const GET_ALL_OWNERS = gql`
  query GetAllOwners($page: Int, $pageSize: Int, $dni: Int, $name: String) {
    getAllOwners(page: $page, page_size: $pageSize, dni: $dni, name: $name) {
      id
      user {
        id
        email
        first_name
        last_name
        dni
        personal_address
        work_address
        phone
        cell_phone
      }
    }
  }
`;

export const TOTAL_OWNERS = gql`
  query TotalOwners {
    totalOwners
  }
`;

export const GET_OWNER = gql`
  query GetOwner($getOwnerId: Int) {
    getOwner(id: $getOwnerId) {
      id
      user {
        email
        first_name
        last_name
        dni
        personal_address
        work_address
        phone
        cell_phone
      }
    }
  }
`;
