import { gql } from "@apollo/client";

export const COUNT_RECEIPT_BY_CLIENT = gql`
  query Query($idClient: Int) {
    countReceiptByClient(id_client: $idClient)
  }
`;

export const GET_RECEIPT_BY_ID = gql`
  query GetReceipt($receiptId: Int) {
    getReceipt(id: $receiptId) {
      id
      amount
      receipt_number
      api
      date
      month
      note
      surcharge
      surcharge_percentage
      rate
      address
      full_name
      client {
        user {
          first_name
          last_name
        }
      }
    }
  }
`;

export const GET_ALL_RECEIPTS = gql`
  query GetAllReceipt(
    $page: Int
    $pageSize: Int
    $month: DateTime
    $fullName: String
  ) {
    getAllReceipts(
      page: $page
      page_size: $pageSize
      month: $month
      full_name: $fullName
    ) {
      results {
        id
        amount
        receipt_number
        api
        date
        month
        note
        surcharge
        surcharge_percentage
        rate
        address
        full_name
        client {
          user {
            first_name
            last_name
          }
        }
      }
      total
    }
  }
`;
