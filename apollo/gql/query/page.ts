import { gql } from "@apollo/client";

export const GET_PAGE = gql`
  query getPage($slug: String!, $language: String!) {
    page(slug: $slug, language: $language) {
      id
      desktop_menu_id
      mobile_menu_id
      sort_order
      status
      slugs {
        slug
        language
      }
      description {
        name
        description
        meta_title
        meta_description
        meta_keywords
        slug
      }
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

export const GET_PAGES_ADMIN = gql`
  query getPagesAdmin {
    pagesOnAdmin {
      id
      desktop_menu_id
      mobile_menu_id
      status
      sort_order
      description {
        name
        description
        meta_title
        meta_keywords
        meta_description
        slug
        language
      }
    }
  }
`;

export const GET_PAGE_ADMIN = gql`
  query getPagesAdmin($input: pageOnAdminInput!) {
    pageOnAdmin(input: $input) {
      id
      desktop_menu_id
      mobile_menu_id
      status
      sort_order
      description {
        name
        description
        meta_title
        meta_keywords
        meta_description
        slug
        language
      }
    }
  }
`;
