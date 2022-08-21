import { gql } from "@apollo/client";

export const GET_CLIENT = gql`
  query Query($idClient: Int!) {
    getClient(id_client: $idClient) {
      id
      email
      first_name
      last_name
      dni
      personal_address
      work_address
      phone
      cell_phone
    }
  }
`;

export const GET_ALL_CLIENTS = gql`
  query GetAllClients($page: Int, $pageSize: Int, $dni: Int, $name: String) {
    getAllClients(page: $page, page_size: $pageSize, dni: $dni, name: $name) {
      results {
        id
        estate {
          id
        }
        user {
          id
          email
          first_name
          last_name
          dni
          personal_address
          work_address
          phone
          cell_phone
        }
      }
      total
    }
  }
`;

export const TOTAL_CLIENTS = gql`
  query TotalClients($page: Int, $pageSize: Int, $dni: Int, $name: String) {
    totalClients(page: $page, page_size: $pageSize, dni: $dni, name: $name)
  }
`;
