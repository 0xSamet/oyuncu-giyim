import { ApolloServer } from "apollo-server-micro";
import { schema } from "../../../apollo/schema";
import { parentCategoriesLoader } from "../../../apollo/dataloaders/category";
import db from "../../../database/connect";
import {
  categoriesDescriptionLoader,
  categoriesDescriptionAdminLoader,
} from "../../../apollo/dataloaders/category";
import {
  desktopMenuDescriptionLoader,
  desktopMenuDescriptionAdminLoader,
  mobileMenuDescriptionLoader,
  mobileMenuDescriptionAdminLoader,
} from "../../../apollo/dataloaders/menu";
import {
  pageDescriptionLoader,
  pageDescriptionAdminLoader,
  pageSlugsLoader,
} from "../../../apollo/dataloaders/page";
import {
  optionDescriptionAdminLoader,
  optionValueAdminLoader,
  optionValueDescriptionAdminLoader,
} from "../../../apollo/dataloaders/option";
import {
  countryDescriptionLoader,
  countryDescriptionAdminLoader,
} from "../../../apollo/dataloaders/localization/country";
import { zoneCountryAdminLoader } from "../../../apollo/dataloaders/localization/zone";
import { geoZoneZonesAdminLoader } from "../../../apollo/dataloaders/localization/geo_zone";
import { taxClassTaxRuleAdminLoader } from "../../../apollo/dataloaders/localization/tax_class";

const apolloServer = new ApolloServer({
  schema,
  context: ({ req, res }) => {
    return {
      req,
      res,
      db,
      loaders: {
        parentCategoriesLoader,
        categoriesDescriptionLoader,
        categoriesDescriptionAdminLoader,
        desktopMenuDescriptionLoader,
        desktopMenuDescriptionAdminLoader,
        mobileMenuDescriptionLoader,
        mobileMenuDescriptionAdminLoader,
        pageDescriptionLoader,
        pageDescriptionAdminLoader,
        pageSlugsLoader,
        optionDescriptionAdminLoader,
        optionValueAdminLoader,
        optionValueDescriptionAdminLoader,
        countryDescriptionLoader,
        countryDescriptionAdminLoader,
        zoneCountryAdminLoader,
        geoZoneZonesAdminLoader,
        taxClassTaxRuleAdminLoader,
      },
    };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/v1" });

/*  formatError: (error: GraphQLError) => {
    if (
      error.originalError instanceof ValidationError ||
      error instanceof ValidationError
    ) {
      console.log("ValidationError");
      return new ValidationError(error.message);
    }

    if (error.originalError instanceof UserInputError) {
      console.log("UserInputError");
      return new UserInputError(error.message);
    }

    if (error.originalError instanceof ApolloError) {
      console.log("ApolloError");
      return error;
    }

    const errorId = uuidv4();
    console.log("Internal Error");
    console.log(error);
    return new GraphQLError("Internal Error : " + errorId);
  }, */
