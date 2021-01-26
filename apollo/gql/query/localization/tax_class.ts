import { gql } from "@apollo/client";

export const GET_TAX_CLASSES_ADMIN = gql`
  query getTaxClassesAdmin {
    taxClassesOnAdmin {
      id
      name
      description
      sort_order
    }
  }
`;

export const GET_TAX_CLASS_ADMIN = gql`
  query getTaxClassAdmin($input: TaxClassInput!) {
    taxClassOnAdmin(input: $input) {
      id
      name
      description
      sort_order
      tax_rules {
        id
        tax_rate_id
        priority
      }
    }
  }
`;
