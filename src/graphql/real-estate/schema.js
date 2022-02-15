import { gql } from "apollo-server-micro";

export const schema = gql`
  type RealEstate {
    id: Int
    email: String
    password: String
  }

  type Query {
    getRealEstate(id: Int): RealEstate
  }
  type Mutation {
    addRealEstate(email: String, password: String): RealEstate
    deleteRealEstate(id: Int): RealEstate
  }
`;
