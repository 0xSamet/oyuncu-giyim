import { gql } from "@apollo/client";

export const GET_PAGE = gql`
  query getPage($slug: String) {
    page(slug: $slug) {
      desktop_menu_id
      mobile_menu_id
      meta_title
      meta_description
      meta_keyword
    }
  }
`;

export const GET_PAGES = gql`
  query getPages {
    pages {
      id
      name
      desktop_menu_id
      mobile_menu_id
      meta_title
      meta_description
      meta_keyword
      slug
    }
  }
`;
