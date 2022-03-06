import { gql } from "apollo-server-micro";

export const ADD_OWNER = gql`
  mutation AddOwner($idUser: Int) {
    addOwner(id_user: $idUser) {
      id
    }
  }
`;
