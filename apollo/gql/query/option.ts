import { gql } from "@apollo/client";

export const GET_OPTION_TYPES = gql`
  query getOptiontypes {
    optionTypes {
      id
      name
      sort_order
    }
  }
`;

export const GET_OPTION_TYPE = gql`
  query getOptiontype($input: OptionTypeInput!) {
    optionType(input: $input) {
      id
      name
      sort_order
    }
  }
`;
