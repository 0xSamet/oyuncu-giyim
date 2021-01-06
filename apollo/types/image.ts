import { gql } from "apollo-server-micro";

export default gql`
  type Image {
    src: String
  }
  input uploadImageInput {
    src: String!
  }
  type Query {
    images: Image
  }
  type Mutation {
    uploadImage(input: uploadImageInput!): Image
  }
`;
