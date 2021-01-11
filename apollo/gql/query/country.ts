import { gql } from "@apollo/client";

export const GET_COUNTRIES_ADMIN = gql`
  query getCountriesAdmin {
    countriesOnAdmin {
      id
      status
      sort_order
      description {
        name
        language
      }
    }
  }
`;

export const GET_COUNTRY_ADMIN = gql`
  query getCountryAdmin($input: CountryOnAdminInput!) {
    countryOnAdmin(input: $input) {
      id
      status
      sort_order
      description {
        name
        language
      }
    }
  }
`;
