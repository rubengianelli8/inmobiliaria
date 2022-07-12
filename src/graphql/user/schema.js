import { gql } from "apollo-server-micro";

export const schema = gql`
  type User {
    id: Int
    email: String
    first_name: String
    last_name: String
    dni: Int
    personal_address: String
    work_address: String
    phone: String
    cell_phone: String
  }

  type Query {
    getUser(id: Int, id_owner: Int, id_client: Int): User
  }
  type Mutation {
    addUser(
      email: String
      first_name: String
      last_name: String
      dni: Int
      personal_address: String
      work_address: String
      phone: String
      cell_phone: String
    ): User
    deleteUser(id: Int): User
  }
`;
