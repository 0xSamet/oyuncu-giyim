import { gql } from "@apollo/client";

export const GET_ZONES_ADMIN = gql`
  query getZonesAdmin {
    zonesOnAdmin {
      id
      name
      status
      sort_order
      country {
        id
        description {
          name
          language
        }
      }
    }
  }
`;

export const GET_ZONES_ADMIN_FOR_OPTION = gql`
  query getZonesAdminForOption {
    zonesOnAdmin {
      id
      name
      status
      sort_order
      country {
        id
      }
    }
  }
`;

export const GET_ZONE_ADMIN = gql`
  query getZoneAdmin($input: ZoneInput!) {
    zoneOnAdmin(input: $input) {
      id
      name
      status
      sort_order
      country {
        id
        description {
          name
          language
        }
      }
    }
  }
`;
