import { gql } from "apollo-server-micro";

export const schema = gql`
  type User {
    id: Int
    email: String
    first_name: String
    last_name: String
  }

  type Query {
    getUser(id: Int): User
  }
  type Mutation {
    addUser(email: String, password: String, id_real_estate: Int): User
    deleteUser(id: Int): User
  }
`;
