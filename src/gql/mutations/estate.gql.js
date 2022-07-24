import { gql } from "@apollo/client";

export const ADD_ESTATE = gql`
  mutation Mutation(
    $type_estate: String
    $province: String
    $city: String
    $location: String
    $neighborhood: String
    $address: String
    $address_number: String
    $floor: String
    $flat: String
    $internal_number: String
    $between_streets: String
    $internal_state: String
    $area_m2: Int
    $area_m3: Int
    $antiquity: Int
    $bedrooms: Int
    $bathrooms: Int
    $garages: Int
    $floors: Int
    $garden: Boolean
    $pool: Boolean
    $credit: Boolean
    $commercial_use: Boolean
    $has_cartel: Boolean
    $pets: Boolean
    $orientation: String
    $type_ceiling: String
    $luminosity: String
    $type: String
    $status: String
    $price: Int
    $id_owner: Int
    $id_client: Int
    $fee: Int
  ) {
    addEstate(
      type_estate: $type_estate
      province: $province
      city: $city
      location: $location
      neighborhood: $neighborhood
      address: $address
      address_number: $address_number
      floor: $floor
      flat: $flat
      internal_number: $internal_number
      between_streets: $between_streets
      internal_state: $internal_state
      area_m2: $area_m2
      area_m3: $area_m3
      antiquity: $antiquity
      bedrooms: $bedrooms
      bathrooms: $bathrooms
      garages: $garages
      floors: $floors
      garden: $garden
      pool: $pool
      credit: $credit
      commercial_use: $commercial_use
      has_cartel: $has_cartel
      pets: $pets
      orientation: $orientation
      type_ceiling: $type_ceiling
      luminosity: $luminosity
      type: $type
      status: $status
      price: $price
      id_owner: $id_owner
      id_client: $id_client
      fee: $fee
    ) {
      id
    }
  }
`;

export const UPDATE_ESTATE = gql`
  mutation Mutation(
    $idEstate: Int
    $type_estate: String
    $province: String
    $city: String
    $location: String
    $neighborhood: String
    $address: String
    $address_number: String
    $floor: String
    $flat: String
    $internal_number: String
    $between_streets: String
    $internal_state: String
    $area_m2: Int
    $area_m3: Int
    $antiquity: Int
    $bedrooms: Int
    $bathrooms: Int
    $garages: Int
    $floors: Int
    $garden: Boolean
    $pool: Boolean
    $credit: Boolean
    $commercial_use: Boolean
    $has_cartel: Boolean
    $pets: Boolean
    $orientation: String
    $type_ceiling: String
    $luminosity: String
    $type: String
    $status: String
    $price: Int
    $certificate_estate: String
    $domain: String
    $id_owner: Int
    $id_client: Int
    $fee: Int
  ) {
    updateEstate(
      id: $idEstate
      type_estate: $type_estate
      province: $province
      city: $city
      location: $location
      neighborhood: $neighborhood
      address: $address
      address_number: $address_number
      floor: $floor
      flat: $flat
      internal_number: $internal_number
      between_streets: $between_streets
      internal_state: $internal_state
      area_m2: $area_m2
      area_m3: $area_m3
      antiquity: $antiquity
      bedrooms: $bedrooms
      bathrooms: $bathrooms
      garages: $garages
      floors: $floors
      garden: $garden
      pool: $pool
      credit: $credit
      commercial_use: $commercial_use
      has_cartel: $has_cartel
      pets: $pets
      orientation: $orientation
      type_ceiling: $type_ceiling
      luminosity: $luminosity
      type: $type
      status: $status
      price: $price
      certificate_estate: $certificate_estate
      domain: $domain
      id_owner: $id_owner
      id_client: $id_client
      fee: $fee
    ) {
      id
    }
  }
`;

export const DELETE_ESTATE = gql`
  mutation Mutation($deleteEstateId: Int) {
    deleteEstate(id: $deleteEstateId) {
      id
    }
  }
`;
