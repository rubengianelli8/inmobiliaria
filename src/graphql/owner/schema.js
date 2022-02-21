import { gql } from "apollo-server-micro";

export const schema = gql`
  type Owner {
    id: Int
    id_user: Int
    user: User
  }

  type Query {
    getOwner(id: Int): Owner
  }
  type Mutation {
    addOwner(id_user: Int): Owner
    updateOwner(id: Int, id_user: Int): Owner
    deleteOwner(id: Int): Owner
  }
`;
