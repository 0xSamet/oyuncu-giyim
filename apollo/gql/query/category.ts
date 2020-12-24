import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query getCategories($language: String!) {
    categories(language: $language) {
      id
      sort_order
      parent_id
      status
      desktop_menu_id
      mobile_menu_id
      description {
        name
        description
        meta_title
        meta_description
        meta_keywords
        slug
      }
      parents {
        id
        description {
          name
        }
      }
    }
  }
`;

export const GET_CATEGORIES_ADMIN = gql`
  query getCategoriesAdmin {
    categoriesOnAdmin {
      id
      parent_id
      status
      sort_order
      desktop_menu_id
      mobile_menu_id
      description {
        name
        description
        meta_title
        meta_description
        meta_keywords
        slug
        language
      }
      parents {
        id
        description {
          name
          language
        }
      }
    }
  }
`;
