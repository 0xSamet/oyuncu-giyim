import { gql } from "apollo-server-micro";

export default gql`
  type ProductOnAdmin {
    status: Boolean!
    model: String!
    sku: String!
    price: Number!
    quantity: Number!
    minimum_quantity: Number!
    sort_order: Number
  }

  input ProductInputImage {
    src: String!
    sort_order: Number!
  }
  input ProductInputOptionValue {
    quantity: Number!
    price: Number!
    price_prefix: String!
  }
  input ProductInputOption {
    required: boolean!
    values: [ProductInputOptionValue!]!
  }
  input ProductInputLocalizedFields {
    name: String!
    description: String!
    meta_title: String!
    meta_description: String!
    meta_keywords: String!
    slug: String!
    language: String!
  }
  input addProductInput {
    status: Boolean!
    description: [ProductInputLocalizedFields!]!
    model: String!
    sku: String!
    price: Number!
    tax_class: Number!
    quantity: Number!
    minimum_quantity: Number!
    sort_order: Number
    categories: [Number!]!
    filters: [Number!]
    options: [ProductInputOption!]
    images: [ProductInputImage!]
  }

  type Mutation {
    addProduct(input: addProductInput!): PageOnAdmin
  }
`;
