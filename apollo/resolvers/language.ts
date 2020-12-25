import { UserInputError, ValidationError } from "apollo-server-micro";
import {
  addLanguageValidate,
  deleteLanguageValidate,
  Language,
  updateLanguageValidate,
} from "../../database/models/language";

export default {
  Query: {
    languages: async (_parent, _args, _context, _info) => {
      const result = await Language.query();
      return result;
    },
    language: async (_parent, { id }, _context, _info) => {
      const result = await Language.query().findById(id);
      return result;
    },
  },
  Mutation: {
    addLanguage: async (_parent, { input }, _context, _info) => {
      let validatedLanguage;
      try {
        validatedLanguage = await addLanguageValidate.validateAsync(input);
      } catch (err) {
        throw new UserInputError(err.details[0].message);
      }
      let { name, code, flag_code, sort_order, status } = validatedLanguage;
      let biggestSortOrder;

      if (!sort_order && sort_order != 0) {
        biggestSortOrder = await Language.query()
          .select("sort_order")
          .orderBy([{ column: "sort_order", order: "DESC" }])
          .first();
      }

      const isLanguageCodeExists: any = await Language.query()
        .where("code", code)
        .first();

      if (isLanguageCodeExists) {
        throw new ValidationError(
          `Dil Kodu ${isLanguageCodeExists.name} dilinde kullanılıyor.`
        );
      }

      const languageAdded = await Language.query().insertAndFetch({
        name,
        code,
        flag_code,
        sort_order: biggestSortOrder
          ? biggestSortOrder.sort_order + 1
          : sort_order,
        status,
      } as any);

      return languageAdded;
    },
    updateLanguage: async (_parent, { input }, _context, _info) => {
      let validatedLanguage;
      try {
        validatedLanguage = await updateLanguageValidate.validateAsync(input);
      } catch (err) {
        throw new UserInputError(err.details[0].message);
      }
      let { id, name, code, flag_code, sort_order, status } = validatedLanguage;
      let biggestSortOrder;

      if (!sort_order && sort_order != 0) {
        biggestSortOrder = await Language.query()
          .select("sort_order")
          .orderBy([{ column: "sort_order", order: "DESC" }])
          .first();
      }

      const isLanguageCodeExists: any = await Language.query()
        .where("code", code)
        .first();

      if (
        isLanguageCodeExists &&
        isLanguageCodeExists.id != validatedLanguage.id
      ) {
        throw new ValidationError(
          `Dil Kodu ${isLanguageCodeExists.name} dilinde kullanılıyor.`
        );
      }

      const updatedLanguage = await Language.query()
        .where("id", id)
        .first()
        .update({
          name,
          code,
          flag_code,
          sort_order: biggestSortOrder
            ? biggestSortOrder.sort_order + 1
            : sort_order,
          status,
        } as any)
        .returning("*");

      return updatedLanguage;
    },
    deleteLanguage: async (_parent, { input }, _context, _info) => {
      let validatedLanguage;
      try {
        validatedLanguage = await deleteLanguageValidate.validateAsync(input);
      } catch (err) {
        throw new UserInputError(err.details[0].message);
      }
      let { id } = validatedLanguage;
      let result;

      const checkDefaultLanguage: any = await Language.query().findById(id);

      if (checkDefaultLanguage.is_default) {
        throw new Error("Ana Dil Silinemez");
      } else {
        result = await Language.query().deleteById(id);
      }

      if (result) {
        return {
          success: true,
        };
      } else {
        return {
          success: false,
        };
      }
    },
  },
};
