import {
  makeExecutableSchema,
  mergeResolvers,
  mergeTypeDefs,
} from "graphql-tools";

import menuTypes from "./types/menu";
import pageTypes from "./types/page";
import categoryTypes from "./types/category";
import languageTypes from "./types/language";
import optionTypes from "./types/option";

import menuResolver from "./resolvers/menu";
import pageResolver from "./resolvers/page";
import categoryResolver from "./resolvers/category";
import languageResolver from "./resolvers/language";
import optionResolver from "./resolvers/option";

const typeDefs = [
  menuTypes,
  pageTypes,
  categoryTypes,
  languageTypes,
  optionTypes,
];

const resolvers = [
  menuResolver,
  pageResolver,
  categoryResolver,
  languageResolver,
  optionResolver,
];

export const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(typeDefs),
  resolvers: mergeResolvers(resolvers),
});
