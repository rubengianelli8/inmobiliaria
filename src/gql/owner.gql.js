import { gql } from "apollo-server-micro";

export const ADD_OWNER = gql`
  mutation AddOwner($idUser: Int) {
    addOwner(id_user: $idUser) {
      id
    }
  }
`;

export const GET_ALL_OWNERS = gql`
  query GetAllOwners {
    getAllOwners {
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
