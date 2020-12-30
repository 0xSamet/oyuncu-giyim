import { UserInputError, ValidationError } from "apollo-server-micro";
import { CategoryDescription } from "../../database/models/category";
import { Language } from "../../database/models/language";
import { addOptionValidate, Option } from "../../database/models/options";
import {
  addPageValidate,
  deletePageValidate,
  Page,
  PageDescription,
  updatePageValidate,
} from "../../database/models/page";
import { tableNames } from "../../database/tableNames";
import { getLanguage } from "./helpers";

export default {
  Mutation: {
    addOption: async (_parent, { input }, _ctx, _info) => {
      let validatedOption;
      try {
        validatedOption = await addOptionValidate.validateAsync(input);
      } catch (err) {
        throw new UserInputError(err.details[0].message);
      }

      console.log(validatedOption);

      const { type, description, option_values, sort_order } = validatedOption;

      let biggestSortOrder;

      if (!sort_order && sort_order != 0) {
        biggestSortOrder = await Option.query()
          .select("sort_order")
          .orderBy([{ column: "sort_order", order: "DESC" }])
          .first();
      }

      console.log();

      const optionAdded = await Option.query().insert({
        type,
        sort_order: biggestSortOrder
          ? biggestSortOrder.sort_order + 1
          : sort_order || 0,
      } as any);

      return null;
    },
  },
  // Query: {
  //   optionTypes: async (_parent, _args, _ctx, _info) => {
  //     const result = await OptionType.query();
  //     return result;
  //   },
  //   optionType: async (_parent, { input: { id } }, _ctx, _info) => {
  //     const result = await OptionType.query().first().where("id", id);
  //     return result;
  //   },
  // },
  // Mutation: {
  //   addOptionType: async (_parent, { input }, _ctx, _info) => {
  //     let validatedOptionType;
  //     try {
  //       validatedOptionType = await addOptionTypeValidate.validateAsync(input);
  //     } catch (err) {
  //       throw new UserInputError(err.details[0].message);
  //     }
  //     let { sort_order, name } = validatedOptionType;
  //     let biggestSortOrder;
  //     if (!sort_order && sort_order != 0) {
  //       biggestSortOrder = await Page.query()
  //         .select("sort_order")
  //         .orderBy([{ column: "sort_order", order: "DESC" }])
  //         .first();
  //     }
  //     const optionTypeAdded: any = await OptionType.query().insert({
  //       name,
  //       sort_order: biggestSortOrder
  //         ? biggestSortOrder.sort_order + 1
  //         : sort_order,
  //     } as any);
  //     return optionTypeAdded;
  //   },
  //   updateOptionType: async (_parent, { input }, _ctx, _info) => {
  //     let validatedOptionType;
  //     try {
  //       validatedOptionType = await updateOptionTypeValidate.validateAsync(
  //         input
  //       );
  //     } catch (err) {
  //       throw new UserInputError(err.details[0].message);
  //     }
  //     let { id, sort_order, name } = validatedOptionType;
  //     let biggestSortOrder;
  //     if (!sort_order && sort_order != 0) {
  //       biggestSortOrder = await Page.query()
  //         .select("sort_order")
  //         .orderBy([{ column: "sort_order", order: "DESC" }])
  //         .first();
  //     }
  //     const isOptionTypeExists = await OptionType.query().where("id", id);
  //     if (!isOptionTypeExists) {
  //       throw new ValidationError("Seçenek Tipi Bulunamadı.");
  //     }
  //     const optionTypeUpdated: any = await OptionType.query()
  //       .update({
  //         name,
  //         sort_order: biggestSortOrder
  //           ? biggestSortOrder.sort_order + 1
  //           : sort_order,
  //       } as any)
  //       .first()
  //       .where("id", id)
  //       .returning("*");
  //     return optionTypeUpdated;
  //   },
  //   deleteOptionType: async (_parent, { input }, _ctx, _info) => {
  //     let validatedOptionType;
  //     try {
  //       validatedOptionType = await deleteOptionTypeValidate.validateAsync(
  //         input
  //       );
  //     } catch (err) {
  //       throw new UserInputError(err.details[0].message);
  //     }
  //     let { id } = validatedOptionType;
  //     const deletedOptionType = await OptionType.query()
  //       .deleteById(id)
  //       .returning("*");
  //     if (!deletedOptionType) {
  //       throw new ValidationError(`Seçenek Tipi Bulunamadı.`);
  //     }
  //     return {
  //       success: true,
  //     };
  //   },
  // },
};
