import { gql } from "apollo-server-micro";

export const schema = gql`
  type Owner {
    id: Int
    id_user: Int
    cbu: String
    alias_cbu: String
    bank: String
    number_account: String
    user: User
  }
  type ListOwners {
    results: [Owner]
    total: Int
  }
  type Query {
    getOwner(id: Int): Owner
    getAllOwners(page_size: Int, page: Int, dni: Int, name: String): ListOwners
    totalOwners: Int
  }
  type Mutation {
    addOwner(
      id_user: Int
      cbu: String
      alias_cbu: String
      bank: String
      number_account: String
    ): Owner
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
      cbu: String
      alias_cbu: String
      bank: String
      number_account: String
    ): Owner
    deleteOwner(id: Int): Owner
  }
`;
