import { gql } from "apollo-server-micro";

export const ADD_OWNER = gql`
  mutation AddOwner(
    $idUser: Int
    $cbu: String
    $alias_cbu: String
    $bank: String
    $number_account: String
  ) {
    addOwner(
      id_user: $idUser
      cbu: $cbu
      alias_cbu: $alias_cbu
      bank: $bank
      number_account: $number_account
    ) {
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
    $cbu: String
    $alias_cbu: String
    $bank: String
    $number_account: String
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
      cbu: $cbu
      alias_cbu: $alias_cbu
      bank: $bank
      number_account: $number_account
    ) {
      id
    }
  }
`;

export const GET_ALL_OWNERS = gql`
  query GetAllOwners($page: Int, $pageSize: Int, $dni: Int, $name: String) {
    getAllOwners(page: $page, page_size: $pageSize, dni: $dni, name: $name) {
      results {
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
      total
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
      cbu
      alias_cbu
      bank
      number_account
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

export const DELETE_OWNER = gql`
  mutation DeleteOwner($id: Int) {
    deleteOwner(id: $id) {
      id
    }
  }
`;
