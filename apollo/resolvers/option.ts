import { UserInputError, ValidationError } from "apollo-server-micro";
import { Language } from "../../database/models/language";
import {
  addOptionValidate,
  Option,
  OptionDescription,
  OptionValue,
  OptionValueDescription,
  updateOptionValidate,
  deleteOptionValidate,
} from "../../database/models/options";
import { tableNames } from "../../database/tableNames";
import { getLanguage } from "./helpers";

export default {
  OptionValueOnAdmin: {
    description: async (
      parent,
      _params,
      { loaders: { optionValueDescriptionAdminLoader } },
      _info
    ) => {
      return optionValueDescriptionAdminLoader.load({
        id: parent.id,
      });
    },
  },
  OptionOnAdmin: {
    description: async (
      parent,
      _params,
      { loaders: { optionDescriptionAdminLoader } },
      _info
    ) => {
      return optionDescriptionAdminLoader.load({
        id: parent.id,
      });
    },
    option_values: async (
      parent,
      _params,
      { loaders: { optionValueAdminLoader } },
      _info
    ) => {
      return optionValueAdminLoader.load({
        id: parent.id,
      });
    },
  },
  Query: {
    optionsOnAdmin: async (_parent, { input }, _ctx, _info) => {
      const response = await Option.query();

      return response;
    },
    optionOnAdmin: async (_parent, { input: { id } }, _ctx, _info) => {
      const result = await Option.query().first().where("id", id);
      return result;
    },
  },
  Mutation: {
    addOption: async (_parent, { input }, _ctx, _info) => {
      let validatedOption;
      try {
        validatedOption = await addOptionValidate.validateAsync(input);
      } catch (err) {
        throw new UserInputError(err.details[0].message);
      }

      console.log(validatedOption);

      const { type, sort_order } = validatedOption;

      let biggestSortOrder;

      if (!sort_order && sort_order != 0) {
        biggestSortOrder = await Option.query()
          .select("sort_order")
          .orderBy([{ column: "sort_order", order: "DESC" }])
          .first();
      }

      const optionAdded: any = await Option.query().insert({
        type,
        sort_order: biggestSortOrder
          ? biggestSortOrder.sort_order + 1
          : sort_order || 0,
      } as any);

      for (const description of validatedOption.description) {
        const getLanguage: any = await Language.query()
          .where("code", description.language)
          .first();

        if (getLanguage) {
          await OptionDescription.query().insert({
            option_id: optionAdded.id,
            language_id: getLanguage.id,
            name: description.name,
          } as any);
        }
      }

      for (const optionValue of validatedOption.option_values) {
        const optionValueAdded: any = await OptionValue.query().insert({
          option_id: optionAdded.id,
          sort_order: optionValue.sort_order,
        } as any);

        for (const optionValueDescription of optionValue.description) {
          const getLanguage: any = await Language.query()
            .where("code", optionValueDescription.language)
            .first();
          if (getLanguage) {
            await OptionValueDescription.query().insert({
              option_value_id: optionValueAdded.id,
              language_id: getLanguage.id,
              name: optionValueDescription.name,
            } as any);
          }
        }
      }

      return optionAdded;
    },
    updateOption: async (_parent, { input }, _ctx, _info) => {
      let validatedOption;
      try {
        validatedOption = await updateOptionValidate.validateAsync(input);
      } catch (err) {
        throw new UserInputError(err.details[0].message);
      }

      const { id, type, sort_order } = validatedOption;

      const isOptionExists = await Option.query().where("id", id);

      if (!isOptionExists) {
        throw new ValidationError("Seçenek Bulunamadı.");
      }

      let biggestSortOrder;

      if (!sort_order && sort_order != 0) {
        biggestSortOrder = await Option.query()
          .select("sort_order")
          .orderBy([{ column: "sort_order", order: "DESC" }])
          .first();
      }

      const optionUpdated: any = await Option.query()
        .update({
          type,
          sort_order: biggestSortOrder
            ? biggestSortOrder.sort_order + 1
            : sort_order || 0,
        } as any)
        .where("id", id)
        .first()
        .returning("*");

      for (const description of validatedOption.description) {
        const getLanguage: any = await Language.query()
          .where("code", description.language)
          .first();

        if (getLanguage) {
          const isDescriptionExists = await OptionDescription.query()
            .where("option_id", id)
            .andWhere("language_id", getLanguage.id)
            .first();

          if (isDescriptionExists) {
            await OptionDescription.query()
              .update({
                name: description.name,
              } as any)
              .where("option_id", id)
              .andWhere("language_id", getLanguage.id);
          } else {
            await OptionDescription.query().insert({
              name: description.name,
              option_id: id,
              language_id: getLanguage.id,
            } as any);
          }
        }
      }

      await OptionValue.query().del().where("option_id", id);

      for (const optionValue of validatedOption.option_values) {
        console.log(optionUpdated);
        const optionValueAdded: any = await OptionValue.query().insert({
          option_id: optionUpdated.id,
          sort_order: optionValue.sort_order,
        } as any);

        for (const optionValueDescription of optionValue.description) {
          const getLanguage: any = await Language.query()
            .where("code", optionValueDescription.language)
            .first();
          if (getLanguage) {
            await OptionValueDescription.query().insert({
              option_value_id: optionValueAdded.id,
              language_id: getLanguage.id,
              name: optionValueDescription.name,
            } as any);
          }
        }
      }

      return optionUpdated;
    },
    deleteOption: async (_parent, { input }, { db }, _info) => {
      let validatedOption;
      try {
        validatedOption = await deleteOptionValidate.validateAsync(input);
      } catch (err) {
        throw new UserInputError(err.details[0].message);
      }

      let { id } = validatedOption;

      const deletedOption = await Option.query().deleteById(id).returning("*");

      if (!deletedOption) {
        throw new ValidationError(`Seçenek Bulunamadı.`);
      }

      return {
        success: true,
      };
    },
  },
};
