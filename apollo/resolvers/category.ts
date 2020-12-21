import { UserInputError, ValidationError } from "apollo-server-micro";
import {
  Category,
  addCategoryValidate,
  updateCategoryValidate,
  deleteCategoryValidate,
  CategoryDescription,
} from "../../database/models/category";
import { Language } from "../../database/models/language";
import { tableNames } from "../../database/tableNames";
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
  CategoryOnAdmin: {
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
      { loaders: { categoriesDescriptionAdminLoader } },
      _info
    ) => {
      return categoriesDescriptionAdminLoader.load(parent);
    },
  },
  Query: {
    categories: async (_parent, params, { db, req }, _info) => {
      const result = await Category.query();
      req.language = await getLanguage(params);

      return result;
    },
    categoriesOnAdmin: async (_parent, params, { db, req }, _info) => {
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

      console.log(validatedCategory);

      let { parent_id, sort_order, status } = validatedCategory;

      let biggestSortOrder;

      if (!sort_order && sort_order != 0) {
        biggestSortOrder = await Category.query()
          .select("sort_order")
          .orderBy([{ column: "sort_order", order: "DESC" }])
          .first();
      }

      let isSlugExists = {
        status: false,
        usingBy: null,
      };

      for (const description of validatedCategory.description) {
        const isExists: any = await CategoryDescription.query()
          .where("slug", description.slug)
          .first();

        if (isExists) {
          isSlugExists = {
            status: true,
            usingBy: isExists.name,
          };
          break;
        }
      }

      if (isSlugExists.status) {
        throw new ValidationError(
          `Slug ${isSlugExists.usingBy} kategorisinde kullanılıyor.`
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

      const categoryAdded: any = await Category.query().insert({
        parent_id,
        status,
        sort_order: biggestSortOrder
          ? biggestSortOrder.sort_order + 1
          : sort_order,
      } as any);

      for (const description of validatedCategory.description) {
        const getLanguage: any = await Language.query()
          .where("code", description.language)
          .first();

        if (getLanguage) {
          await CategoryDescription.query().insert({
            category_id: categoryAdded.id,
            language_id: getLanguage.id,
            name: description.name,
            description: description.description,
            meta_title: description.meta_title,
            meta_description: description.meta_description,
            meta_keywords: description.meta_keywords,
            slug: description.slug,
          } as any);
        }
      }

      return categoryAdded;
    },
    updateCategory: async (_parent, { input }, { db }, _info) => {
      let validatedCategory;
      try {
        validatedCategory = await updateCategoryValidate.validateAsync(input);
      } catch (err) {
        throw new UserInputError(err.details[0].message);
      }

      let { id, parent_id, sort_order, status } = validatedCategory;

      const isCategoryExists = await Category.query().first().where("id", id);

      if (!isCategoryExists) {
        throw new UserInputError(`Kategori Bulunamadı.`);
      }

      let biggestSortOrder;

      if (!sort_order && sort_order != 0) {
        biggestSortOrder = await Category.query()
          .select("sort_order")
          .orderBy([{ column: "sort_order", order: "DESC" }])
          .first();
      }

      // const isSlugExists: any = await Category.query().where("slug", slug).first();

      // if (isSlugExists && isSlugExists.slug != validatedCategory.slug) {
      //   throw new ValidationError(
      //     `Slug ${isSlugExists.name} kategorisinde kullanılıyor.`
      //   );
      // }

      let isSlugExists = {
        status: false,
        usingBy: null,
      };

      for (const description of validatedCategory.description) {
        const isExists: any = await CategoryDescription.query()
          .where("slug", description.slug)
          .first();

        if (isExists && isExists.slug !== description.slug) {
          isSlugExists = {
            status: true,
            usingBy: isExists.name,
          };
          break;
        }
      }

      if (isSlugExists.status) {
        throw new ValidationError(
          `Slug ${isSlugExists.usingBy} kategorisinde kullanılıyor.`
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
        .update({
          parent_id,
          sort_order: biggestSortOrder
            ? biggestSortOrder.sort_order + 1
            : sort_order,
          status,
        } as any)
        .where("id", id)
        .first()
        .returning("*");

      for (const description of validatedCategory.description) {
        const getLanguage: any = await Language.query()
          .where("code", description.language)
          .first();

        if (getLanguage) {
          const isDescriptionExists = await CategoryDescription.query()
            .where("category_id", id)
            .andWhere("language_id", getLanguage.id);
          if (isDescriptionExists) {
            await CategoryDescription.query()
              .update({
                name: description.name,
                description: description.description,
                meta_title: description.meta_title,
                meta_description: description.meta_description,
                meta_keywords: description.meta_keywords,
                slug: description.slug,
              } as any)
              .where("category_id", id)
              .andWhere("language_id", getLanguage.id);
          } else {
            await CategoryDescription.query().insert({
              name: description.name,
              description: description.description,
              meta_title: description.meta_title,
              meta_description: description.meta_description,
              meta_keywords: description.meta_keywords,
              slug: description.slug,
              category_id: id,
              language_id: getLanguage.id,
            } as any);
          }
        }
      }

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
