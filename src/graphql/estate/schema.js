import { gql } from "apollo-server-micro";

export const schema = gql`
  type Estate {
    id: Int
    type_estate: String
    province: String
    city: String
    location: String
    neighborhood: String
    address: String
    address_number: String
    floor: String
    flat: String
    internal_number: String
    between_streets: String
    internal_state: String
    area_m2: Int
    area_m3: Int
    antiquity: Int
    bedrooms: Int
    bathrooms: Int
    garages: Int
    floors: Int
    garden: Boolean
    pool: Boolean
    credit: Boolean
    commercial_use: Boolean
    has_cartel: Boolean
    pets: Boolean
    orientation: String
    type_ceiling: String
    luminosity: String
    type: String
    status: String
    price: Int
    certificate_estate: String
    domain: String
    id_owner: Int
    id_client: Int
    surcharge_percentage: Int
    payment_plan: [PaymentPlan]
    fee: Int
    owner: Owner
    client: Client
  }

  type ListEstates {
    results: [Estate]
    total: Int
  }
  type Query {
    getEstate(id: Int): Estate
    getAllEstatesByOwner(
      owner_id: Int
      client_id: Int
      until: Int
      since: Int
      domain: String
      neighborhood: String
      page: Int
      page_size: Int
      status: String
    ): ListEstates
    getTotalEstates(
      owner_id: Int
      until: Int
      since: Int
      domain: String
      neighborhood: String
      status: String
    ): Int
  }
  type Mutation {
    addEstate(
      type_estate: String
      province: String
      city: String
      location: String
      neighborhood: String
      address: String
      address_number: String
      floor: String
      flat: String
      internal_number: String
      between_streets: String
      internal_state: String
      area_m2: Int
      area_m3: Int
      antiquity: Int
      bedrooms: Int
      bathrooms: Int
      garages: Int
      floors: Int
      garden: Boolean
      pool: Boolean
      credit: Boolean
      commercial_use: Boolean
      has_cartel: Boolean
      pets: Boolean
      orientation: String
      type_ceiling: String
      luminosity: String
      type: String
      status: String
      price: Int
      surcharge_percentage: Int
      fee: Int
      certificate_estate: String
      domain: String
      id_owner: Int
      id_client: Int
    ): Estate
    updateEstate(
      id: Int
      type_estate: String
      province: String
      city: String
      location: String
      neighborhood: String
      address: String
      address_number: String
      floor: String
      flat: String
      internal_number: String
      between_streets: String
      internal_state: String
      area_m2: Int
      area_m3: Int
      antiquity: Int
      bedrooms: Int
      bathrooms: Int
      garages: Int
      floors: Int
      garden: Boolean
      pool: Boolean
      credit: Boolean
      commercial_use: Boolean
      has_cartel: Boolean
      pets: Boolean
      orientation: String
      type_ceiling: String
      luminosity: String
      type: String
      status: String
      price: Int
      certificate_estate: String
      domain: String
      surcharge_percentage: Int
      fee: Int
      id_owner: Int
      id_client: Int
    ): Estate
    deleteEstate(id: Int): Estate
  }
`;
