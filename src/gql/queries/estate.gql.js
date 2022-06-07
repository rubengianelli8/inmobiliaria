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
      bedrooms
      antiquity
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
      id_owner
      id_client
    }
  }
`;
export const GET_ALL_ESTATES_BY_OWNER = gql`
  query GetAllEstatesByOwner($ownerId: Int) {
    getAllEstatesByOwner(owner_id: $ownerId) {
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
      owner {
        user {
          first_name
          last_name
        }
      }
    }
  }
`;
