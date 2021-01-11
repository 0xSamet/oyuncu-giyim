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
//import imageTypes from "./types/image";
import countryTypes from "./types/country";

import menuResolver from "./resolvers/menu";
import pageResolver from "./resolvers/page";
import categoryResolver from "./resolvers/category";
import languageResolver from "./resolvers/language";
import optionResolver from "./resolvers/option";
//import imageResolver from "./resolvers/image";
import countryResolver from "./resolvers/country";

const typeDefs = [
  menuTypes,
  pageTypes,
  categoryTypes,
  languageTypes,
  optionTypes,
  countryTypes,
];

const resolvers = [
  menuResolver,
  pageResolver,
  categoryResolver,
  languageResolver,
  optionResolver,
  countryResolver,
];

export const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(typeDefs),
  resolvers: mergeResolvers(resolvers),
});
