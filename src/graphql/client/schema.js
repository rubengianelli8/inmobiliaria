import { gql } from "apollo-server-micro";

export const schema = gql`
  type Client {
    id: Int
    id_user: Int
    user: User
    estate: [Estate]
  }

  type ListClient {
    results: [Client]
    total: Int
  }
  type Query {
    getClient(id_client: Int!): User
    getAllClients(page_size: Int, page: Int, dni: Int, name: String): ListClient
    totalClients(page_size: Int, page: Int, dni: Int, name: String): Int
  }

  type Mutation {
    addClient(
      email: String
      first_name: String
      last_name: String
      dni: Int
      personal_address: String
      work_address: String
      phone: String
      cell_phone: String
    ): User
    updateClient(
      id_client: Int
      email: String
      first_name: String
      last_name: String
      dni: Int
      personal_address: String
      work_address: String
      phone: String
      cell_phone: String
    ): User
  }
`;
