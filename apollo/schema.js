import { makeExecutableSchema } from "graphql-tools";
const { mergeResolvers, mergeTypeDefs } = require("@graphql-tools/merge");

import menuTypes from "./types/menu";
import pageTypes from "./types/page";
import categoryTypes from "./types/category";

import menuResolver from "./resolvers/menu";
import pageResolver from "./resolvers/page";
import categoryResolver from "./resolvers/category";

const resolvers = [menuResolver, pageResolver, categoryResolver];
const typeDefs = [menuTypes, pageTypes, categoryTypes];

export const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(typeDefs),
  resolvers: mergeResolvers(resolvers),
});
