import { makeExecutableSchema } from "graphql-tools";
const { mergeResolvers, mergeTypeDefs } = require("@graphql-tools/merge");

import menuTypes from "./types/menu";
import pageTypes from "./types/page";

import menuResolver from "./resolvers/menu";
import pageResolver from "./resolvers/page";

const resolvers = [menuResolver, pageResolver];
const typeDefs = [menuTypes, pageTypes];

export const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(typeDefs),
  resolvers: mergeResolvers(resolvers),
});
