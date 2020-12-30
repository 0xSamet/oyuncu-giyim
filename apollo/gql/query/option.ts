import { gql } from "@apollo/client";

export const GET_OPTIONS_ADMIN_JUST_NAMES = gql`
  query optionsOnAdmin {
    optionsOnAdmin {
      id
      type
      sort_order
      description {
        name
        language
      }
    }
  }
`;

export const GET_OPTION_ADMIN = gql`
  query optionOnAdmin($input: optionOnAdminInput!) {
    optionOnAdmin(input: $input) {
      id
      type
      sort_order
      description {
        name
        language
      }
      option_values {
        id
        sort_order
        description {
          name
          language
        }
      }
    }
  }
`;
