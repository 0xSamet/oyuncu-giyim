import { UserInputError, ValidationError } from "apollo-server-micro";
import {
  Category,
  addCategoryValidate,
  updateCategoryValidate,
  deleteCategoryValidate,
} from "../../database/models/category";
import { getParentCategories } from "../dataloaders/category";
import { getLanguage } from "./helpers";

export default {
  Category: {
    parents: async (
      parent,
      _params,
      { loaders: { parentCategoriesLoader } },
      _info
    ) => {
      return parentCategoriesLoader.load(parent);
    },
    description: async (
      parent,
      params,
      { loaders: { categoriesDescriptionLoader }, req },
      _info
    ) => {
      return categoriesDescriptionLoader.load({
        id: parent.id,
        language: req.language,
      });
    },
  },
  Query: {
    categories: async (_parent, params, { db, req }, _info) => {
      const result = await Category.query();
      req.language = await getLanguage(params);

      return result;
    },
  },
  Mutation: {
    addCategory: async (_parent, { input }, { db }, _info) => {
      let validatedCategory;
      try {
        validatedCategory = await addCategoryValidate.validateAsync(input);
      } catch (err) {
        throw new UserInputError(err.details[0].message);
      }

      let {
        name,
        meta_title,
        meta_description,
        meta_keyword,
        parent_id,
        sort_order,
        status,
        slug,
      } = validatedCategory;

      let biggestSortOrder;

      if (!sort_order && sort_order != 0) {
        biggestSortOrder = await Category.query()
          .select("sort_order")
          .orderBy([{ column: "sort_order", order: "DESC" }])
          .first();
      }

      const isSlugExists = await Category.query().where("slug", slug).first();

      if (isSlugExists) {
        throw new ValidationError(
          `Slug ${isSlugExists.name} kategorisinde kullanılıyor.`
        );
      }

      if (parent_id) {
        const isParentExists = await Category.query()
          .where("id", parent_id)
          .first();

        if (!isParentExists) {
          throw new ValidationError(`Üst Kategori Bulunamadı`);
        }
      }

      const categoryAdded = await Category.query().insert({
        name,
        meta_title,
        meta_description,
        meta_keyword,
        parent_id,
        sort_order: biggestSortOrder
          ? biggestSortOrder.sort_order + 1
          : sort_order,
        status,
        slug,
      });

      return categoryAdded;
    },
    updateCategory: async (_parent, { input }, { db }, _info) => {
      let validatedCategory;
      try {
        validatedCategory = await updateCategoryValidate.validateAsync(input);
      } catch (err) {
        throw new UserInputError(err.details[0].message);
      }

      let {
        id,
        name,
        meta_title,
        meta_description,
        meta_keyword,
        parent_id,
        sort_order,
        status,
        slug,
      } = validatedCategory;

      let biggestSortOrder;

      if (!sort_order && sort_order != 0) {
        biggestSortOrder = await Category.query()
          .select("sort_order")
          .orderBy([{ column: "sort_order", order: "DESC" }])
          .first();
      }

      const isSlugExists = await Category.query().where("slug", slug).first();

      if (isSlugExists && isSlugExists.slug != validatedCategory.slug) {
        throw new ValidationError(
          `Slug ${isSlugExists.name} kategorisinde kullanılıyor.`
        );
      }

      if (parent_id) {
        const allCategories = await Category.query();
        const parents = getParentCategories(allCategories, validatedCategory);
        console.log(parents);

        const isParentExists = await Category.query()
          .where("id", parent_id)
          .first();

        if (!isParentExists) {
          throw new ValidationError(`Üst Kategori Bulunamadı.`);
        }
      }

      const updatedCategory = await Category.query()
        .where("id", id)
        .first()
        .update({
          name,
          meta_title,
          meta_description,
          meta_keyword,
          parent_id,
          sort_order: biggestSortOrder
            ? biggestSortOrder.sort_order + 1
            : sort_order,
          status,
          slug,
        })
        .returning("*");

      return updatedCategory;
    },
    deleteCategory: async (_parent, { input }, { db }, _info) => {
      let validatedCategory;
      try {
        validatedCategory = await deleteCategoryValidate.validateAsync(input);
      } catch (err) {
        throw new UserInputError(err.details[0].message);
      }

      let { id } = validatedCategory;

      const deletedCategory = await Category.query()
        .deleteById(id)
        .returning("*");

      if (!deletedCategory) {
        throw new ValidationError(`Kategori Bulunamadı.`);
      }

      return {
        success: true,
      };
    },
  },
};
