import { gql } from "apollo-server-micro";

export const schema = gql`
  type Owner {
    id: Int
    id_user: Int
    user: User
  }

  type Query {
    getOwner(id: Int): Owner
    getAllOwners(page_size: Int, page: Int, dni: Int, name: String): [Owner]
    totalOwners: Int
  }
  type Mutation {
    addOwner(id_user: Int): Owner
    updateOwner(
      id: Int
      email: String
      first_name: String
      last_name: String
      dni: Int
      personal_address: String
      work_address: String
      phone: String
      cell_phone: String
    ): Owner
    deleteOwner(id: Int): Owner
  }
`;
