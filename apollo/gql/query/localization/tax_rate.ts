import { gql } from "@apollo/client";

export const GET_TAX_RATES_ADMIN = gql`
  query getTaxRatesAdmin {
    taxRatesOnAdmin {
      id
      name
      type
      rate
      sort_order
      geo_zone_id
    }
  }
`;

export const GET_TAX_RATE_ADMIN = gql`
  query getTaxRateAdmin($input: TaxRateInput!) {
    taxRateOnAdmin(input: $input) {
      id
      name
      type
      rate
      sort_order
      geo_zone_id
    }
  }
`;
