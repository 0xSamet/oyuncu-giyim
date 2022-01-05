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
import taxRateTypes from "./types/localization/tax_rate";
import taxClassTypes from "./types/localization/tax_class";
import stockStatusTypes from "./types/localization/stock_status";

import menuResolver from "./resolvers/menu";
import pageResolver from "./resolvers/page";
import categoryResolver from "./resolvers/category";
import languageResolver from "./resolvers/localization/language";
import optionResolver from "./resolvers/option";
//import imageResolver from "./resolvers/image";
import countryResolver from "./resolvers/localization/country";
import zoneResolver from "./resolvers/localization/zone";
import geoZoneResolver from "./resolvers/localization/geo_zone";
import taxRateResolver from "./resolvers/localization/tax_rate";
import taxClassResolver from "./resolvers/localization/tax_class";
import stockStatusResolver from "./resolvers/localization/stock_status";

const typeDefs = [
  menuTypes,
  pageTypes,
  categoryTypes,
  languageTypes,
  optionTypes,
  countryTypes,
  zoneTypes,
  geoZoneTypes,
  taxRateTypes,
  taxClassTypes,
  stockStatusTypes,
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
  taxRateResolver,
  taxClassResolver,
  stockStatusResolver,
];

export const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(typeDefs),
  resolvers: mergeResolvers(resolvers),
});
