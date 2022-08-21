import { gql } from "@apollo/client";

export const GET_ESTATE_BY_ID = gql`
  query GetEstate($estateId: Int) {
    getEstate(id: $estateId) {
      id
      type_estate
      province
      city
      location
      neighborhood
      address
      address_number
      floor
      flat
      internal_number
      between_streets
      internal_state
      area_m2
      area_m3
      antiquity
      bedrooms
      bathrooms
      garages
      floors
      garden
      pool
      credit
      commercial_use
      has_cartel
      pets
      orientation
      type_ceiling
      luminosity
      type
      status
      price
      certificate_estate
      domain
      owner {
        id
        user {
          first_name
          last_name
          dni
        }
      }
    }
  }
`;
export const GET_TOTAL_ESTATES = gql`
  query Query(
    $until: Int
    $since: Int
    $domain: String
    $neighborhood: String
    $status: String
  ) {
    getTotalEstates(
      until: $until
      since: $since
      domain: $domain
      neighborhood: $neighborhood
      status: $status
    )
  }
`;
export const GET_ALL_ESTATES_BY_OWNER = gql`
  query GetAllEstatesByOwner(
    $ownerId: Int
    $clientId: Int
    $until: Int
    $since: Int
    $domain: String
    $neighborhood: String
    $page: Int
    $page_size: Int
    $status: String
  ) {
    getAllEstatesByOwner(
      owner_id: $ownerId
      client_id: $clientId
      until: $until
      since: $since
      domain: $domain
      neighborhood: $neighborhood
      page: $page
      page_size: $page_size
      status: $status
    ) {
      results {
        id
        type_estate
        province
        city
        location
        address
        address_number
        area_m2
        bedrooms
        bathrooms
        garages
        floors
        price
        type
        status
        neighborhood
        domain
        certificate_estate
        id_owner
        owner {
          user {
            first_name
            last_name
          }
        }
        client {
          user {
            first_name
            last_name
          }
        }
        payment_plan {
          id
          id_client
          api
          price
          entry
          finish
          increases_every
          note
          surcharge_percentage
          payment_deadline
        }
      }
      total
    }
  }
`;
