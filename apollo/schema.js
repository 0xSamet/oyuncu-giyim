import { makeExecutableSchema } from "graphql-tools";
const { mergeResolvers, mergeTypeDefs } = require("@graphql-tools/merge");

import menuTypes from "./types/menu";
import pageTypes from "./types/page";
import categoryTypes from "./types/category";
import languageTypes from "./types/language";

import menuResolver from "./resolvers/menu";
import pageResolver from "./resolvers/page";
import categoryResolver from "./resolvers/category";
import languageResolver from "./resolvers/language";

const typeDefs = [menuTypes, pageTypes, categoryTypes, languageTypes];

const resolvers = [
  menuResolver,
  pageResolver,
  categoryResolver,
  languageResolver,
];

export const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(typeDefs),
  resolvers: mergeResolvers(resolvers),
});
