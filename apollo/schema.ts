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
import imageTypes from "./types/image";

import menuResolver from "./resolvers/menu";
import pageResolver from "./resolvers/page";
import categoryResolver from "./resolvers/category";
import languageResolver from "./resolvers/language";
import optionResolver from "./resolvers/option";
import imageResolver from "./resolvers/image";

const typeDefs = [
  menuTypes,
  pageTypes,
  categoryTypes,
  languageTypes,
  optionTypes,
  imageTypes,
];

const resolvers = [
  menuResolver,
  pageResolver,
  categoryResolver,
  languageResolver,
  optionResolver,
  imageResolver,
];

export const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(typeDefs),
  resolvers: mergeResolvers(resolvers),
});
