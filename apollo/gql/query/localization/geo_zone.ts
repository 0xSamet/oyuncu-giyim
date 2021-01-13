import { gql } from "@apollo/client";

export const GET_GEO_ZONES_ADMIN = gql`
  query getGeoZonesAdmin {
    geoZonesOnAdmin {
      id
      name
      sort_order
    }
  }
`;

export const GET_GEO_ZONE_ADMIN = gql`
  query getGeoZoneAdmin($input: GeoZoneInput!) {
    geoZoneOnAdmin(input: $input) {
      id
      name
      description
      sort_order
      zones {
        country_id
        zone_id
      }
    }
  }
`;
