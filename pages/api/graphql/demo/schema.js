import { gql } from "apollo-server-micro";

export const schema = gql`
  type Profile {
    id: Int
    name: String
    description: String
  }

  type Query {
    getProfiles: [Profile]
    getProfile(id: Int, name: String): Profile
  }

  type Mutation {
    addProfile(name: String): Profile
    deleteProfile(id: Int): Profile
  }
`;
