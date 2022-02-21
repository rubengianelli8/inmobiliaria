import { gql } from "apollo-server-micro";

export const schema = gql`
  type User {
    id: Int
    email: String
    password: String
    id_real_estate: Int
    real_estate: RealEstate
  }

  type Query {
    getUser(id: Int): User
  }
  type Mutation {
    addUser(email: String, password: String, id_real_estate: Int): User
    deleteUser(id: Int): User
  }
`;
