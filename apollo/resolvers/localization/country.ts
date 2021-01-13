import { UserInputError, ValidationError } from "apollo-server-micro";
import { CategoryDescription } from "../../../database/models/category";
import { Language } from "../../../database/models/localization/language";
import {
  addCountryValidate,
  deleteCountryValidate,
  Country,
  CountryDescription,
  updateCountryValidate,
} from "../../../database/models/localization/country";
import { tableNames } from "../../../database/tableNames";
import { getLanguage } from "../helpers";

// resolver lar yapılcak

export default {
  CountryOnAdmin: {
    description: async (
      parent,
      params,
      { loaders: { countryDescriptionAdminLoader } },
      _info
    ) => {
      return countryDescriptionAdminLoader.load(parent);
    },
  },
  Country: {
    description: async (
      parent,
      params,
      { loaders: { countryDescriptionLoader }, req },
      _info
    ) => {
      return countryDescriptionLoader.load({
        id: parent.id,
        language: req.language,
      });
    },
  },
  Query: {
    countries: async (_parent, params, { db, req }, _info) => {
      req.language = await getLanguage(params);
      const result = await CountryDescription.query()
        .select(
          `${tableNames.country}.id`,
          `${tableNames.country}.sort_order`,
          `${tableNames.country}.status`
        )
        .joinRelated(tableNames.country)
        .joinRelated(tableNames.language)
        .where("code", req.language)
        .andWhere(`${tableNames.country}.status`, true);

      console.log(result);

      return result;
    },
    countriesOnAdmin: async (_parent, params, { db, req }, _info) => {
      const result = await Country.query();

      return result;
    },
    countryOnAdmin: async (_parent, { input: { id } }, _ctx, _info) => {
      const result = await Country.query().first().where("id", id);
      return result;
    },
  },
  Mutation: {
    addCountry: async (_parent, { input }, { db }, _info) => {
      let validatedCountry;
      try {
        validatedCountry = await addCountryValidate.validateAsync(input);
      } catch (err) {
        throw new UserInputError(err.details[0].message);
      }

      let { sort_order, status } = validatedCountry;

      let biggestSortOrder;

      if (!sort_order && sort_order != 0) {
        biggestSortOrder = await Country.query()
          .select("sort_order")
          .orderBy([{ column: "sort_order", order: "DESC" }])
          .first();
      }

      const countryAdded: any = await Country.query().insert({
        status,
        sort_order: biggestSortOrder
          ? biggestSortOrder.sort_order + 1
          : sort_order || 0,
      } as any);

      for (const description of validatedCountry.description) {
        const getLanguage: any = await Language.query()
          .where("code", description.language)
          .first();

        if (getLanguage) {
          await CountryDescription.query().insert({
            country_id: countryAdded.id,
            language_id: getLanguage.id,
            name: description.name,
          } as any);
        }
      }

      return countryAdded;
    },
    updateCountry: async (_parent, { input }, { db }, _info) => {
      let validatedCountry;
      try {
        validatedCountry = await updateCountryValidate.validateAsync(input);
      } catch (err) {
        throw new UserInputError(err.details[0].message);
      }

      let { id, sort_order, status } = validatedCountry;

      const isCountryExists = await Country.query().first().where("id", id);

      if (!isCountryExists) {
        throw new UserInputError(`Ülke Bulunamadı.`);
      }

      let biggestSortOrder;

      if (!sort_order && sort_order != 0) {
        biggestSortOrder = await Country.query()
          .select("sort_order")
          .orderBy([{ column: "sort_order", order: "DESC" }])
          .first();
      }

      const updatedCountry = await Country.query()
        .update({
          sort_order: biggestSortOrder
            ? biggestSortOrder.sort_order + 1
            : sort_order,
          status,
        } as any)
        .where("id", id)
        .first()
        .returning("*");

      for (const description of validatedCountry.description) {
        const getLanguage: any = await Language.query()
          .where("code", description.language)
          .first();

        if (getLanguage) {
          const isDescriptionExists = await CountryDescription.query()
            .where("country_id", id)
            .andWhere("language_id", getLanguage.id)
            .first();
          if (isDescriptionExists) {
            await CountryDescription.query()
              .update({
                name: description.name,
              } as any)
              .where("country_id", id)
              .andWhere("language_id", getLanguage.id);
          } else {
            await CountryDescription.query().insert({
              name: description.name,
              country_id: id,
              language_id: getLanguage.id,
            } as any);
          }
        }
      }

      return updatedCountry;
    },
    deleteCountry: async (_parent, { input }, { db }, _info) => {
      let validatedCountry;
      try {
        validatedCountry = await deleteCountryValidate.validateAsync(input);
      } catch (err) {
        throw new UserInputError(err.details[0].message);
      }

      let { id } = validatedCountry;

      const deletedCountry = await Country.query()
        .deleteById(id)
        .returning("*");

      if (!deletedCountry) {
        throw new ValidationError(`Ülke Bulunamadı.`);
      }

      return {
        success: true,
      };
    },
  },
};
