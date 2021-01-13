import {
  makeExecutableSchema,
  mergeResolvers,
  mergeTypeDefs,
} from "graphql-tools";

import menuTypes from "./types/menu";
import pageTypes from "./types/page";
import categoryTypes from "./types/category";
import languageTypes from "./types/localization/language";
import optionTypes from "./types/option";
//import imageTypes from "./types/image";
import countryTypes from "./types/localization/country";
import zoneTypes from "./types/localization/zone";
import geoZoneTypes from "./types/localization/geo_zone";

import menuResolver from "./resolvers/menu";
import pageResolver from "./resolvers/page";
import categoryResolver from "./resolvers/category";
import languageResolver from "./resolvers/localization/language";
import optionResolver from "./resolvers/option";
//import imageResolver from "./resolvers/image";
import countryResolver from "./resolvers/localization/country";
import zoneResolver from "./resolvers/localization/zone";
import geoZoneResolver from "./resolvers/localization/geo_zone";

const typeDefs = [
  menuTypes,
  pageTypes,
  categoryTypes,
  languageTypes,
  optionTypes,
  countryTypes,
  zoneTypes,
  geoZoneTypes,
];

const resolvers = [
  menuResolver,
  pageResolver,
  categoryResolver,
  languageResolver,
  optionResolver,
  countryResolver,
  zoneResolver,
  geoZoneResolver,
];

export const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(typeDefs),
  resolvers: mergeResolvers(resolvers),
});
