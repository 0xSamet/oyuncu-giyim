import { gql } from "apollo-server-micro";

export default gql`
  type asd {
    name: String
  }
  type Query {
    asd: asd
  }
`;
