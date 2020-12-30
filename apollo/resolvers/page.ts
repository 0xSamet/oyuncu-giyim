import { UserInputError, ValidationError } from "apollo-server-micro";
import { CategoryDescription } from "../../database/models/category";
import { Language } from "../../database/models/language";
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
  PageOnAdmin: {
    description: async (
      parent,
      params,
      { loaders: { pageDescriptionAdminLoader } },
      _info
    ) => {
      return pageDescriptionAdminLoader.load(parent);
    },
  },
  Page: {
    description: async (
      parent,
      params,
      { loaders: { pageDescriptionLoader }, req },
      _info
    ) => {
      return pageDescriptionLoader.load({
        id: parent.id,
        language: req.language,
      });
    },
    slugs: async (
      parent,
      params,
      { loaders: { pageSlugsLoader }, req },
      _info
    ) => {
      return pageSlugsLoader.load({
        id: parent.id,
      });
    },
  },
  Query: {
    pages: async (_parent, { slug }, { db }, _info) => {
      const result = await Page.query();

      return result;
    },
    page: async (_parent, params, { db, req }, _info) => {
      req.language = await getLanguage(params);
      const result = await PageDescription.query()
        .select(
          `${tableNames.page}.id`,
          `${tableNames.page}.sort_order`,
          `${tableNames.page}.status`,
          "desktop_menu_id",
          "mobile_menu_id"
        )
        .joinRelated(tableNames.page)
        .joinRelated(tableNames.language)
        .where("slug", params.slug)
        .andWhere("code", req.language)
        .andWhere(`${tableNames.page}.status`, true)
        .first();

      return result;
    },
    pagesOnAdmin: async (_parent, params, { db, req }, _info) => {
      const result = await Page.query();

      return result;
    },
    pageOnAdmin: async (_parent, { input: { id } }, _ctx, _info) => {
      const result = await Page.query().first().where("id", id);
      return result;
    },
  },
  Mutation: {
    addPage: async (_parent, { input }, { db }, _info) => {
      let validatedPage;
      try {
        validatedPage = await addPageValidate.validateAsync(input);
      } catch (err) {
        throw new UserInputError(err.details[0].message);
      }

      let {
        sort_order,
        status,
        desktop_menu_id,
        mobile_menu_id,
      } = validatedPage;

      let biggestSortOrder;

      if (!sort_order && sort_order != 0) {
        biggestSortOrder = await Page.query()
          .select("sort_order")
          .orderBy([{ column: "sort_order", order: "DESC" }])
          .first();
      }

      let isSlugExists = {
        status: false,
        message: "",
      };

      for (const description of validatedPage.description) {
        const isExistsOnPage: any = await PageDescription.query()
          .where("slug", description.slug)
          .first();

        if (isExistsOnPage) {
          isSlugExists = {
            status: true,
            message: `Slug ${isExistsOnPage.name} sayfasında kullanılıyor.`,
          };
          break;
        }

        const isExistsOnCategory: any = await CategoryDescription.query()
          .where("slug", description.slug)
          .first();

        if (isExistsOnCategory) {
          isSlugExists = {
            status: true,
            message: `Slug ${isExistsOnCategory.name} kategorisinde kullanılıyor.`,
          };
          break;
        }
      }

      if (isSlugExists.status) {
        throw new ValidationError(isSlugExists.message);
      }

      const pageAdded: any = await Page.query().insert({
        status,
        desktop_menu_id,
        mobile_menu_id,
        sort_order: biggestSortOrder
          ? biggestSortOrder.sort_order + 1
          : sort_order || 0,
      } as any);

      for (const description of validatedPage.description) {
        const getLanguage: any = await Language.query()
          .where("code", description.language)
          .first();

        if (getLanguage) {
          await PageDescription.query().insert({
            page_id: pageAdded.id,
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

      return pageAdded;
    },
    updatePage: async (_parent, { input }, { db }, _info) => {
      let validatedPage;
      try {
        validatedPage = await updatePageValidate.validateAsync(input);
      } catch (err) {
        throw new UserInputError(err.details[0].message);
      }

      let {
        id,
        sort_order,
        status,
        desktop_menu_id,
        mobile_menu_id,
      } = validatedPage;

      const isPageExists = await Page.query().first().where("id", id);

      if (!isPageExists) {
        throw new UserInputError(`Sayfa Bulunamadı.`);
      }

      let biggestSortOrder;

      if (!sort_order && sort_order != 0) {
        biggestSortOrder = await Page.query()
          .select("sort_order")
          .orderBy([{ column: "sort_order", order: "DESC" }])
          .first();
      }

      let isSlugExists = {
        status: false,
        message: "",
      };

      for (const description of validatedPage.description) {
        const isExistsOnPage: any = await PageDescription.query()
          .where("slug", description.slug)
          .first();

        if (isExistsOnPage && isExistsOnPage.page_id != id) {
          isSlugExists = {
            status: true,
            message: `Slug ${isExistsOnPage.name} sayfasında kullanılıyor.`,
          };
          break;
        }

        const isExistsOnCategory: any = await CategoryDescription.query()
          .where("slug", description.slug)
          .first();

        if (isExistsOnCategory) {
          isSlugExists = {
            status: true,
            message: `Slug ${isExistsOnCategory.name} kategorisinde kullanılıyor.`,
          };
          break;
        }
      }

      if (isSlugExists.status) {
        throw new ValidationError(isSlugExists.message);
      }

      const updatedPage = await Page.query()
        .update({
          sort_order: biggestSortOrder
            ? biggestSortOrder.sort_order + 1
            : sort_order,
          status,
          desktop_menu_id,
          mobile_menu_id,
        } as any)
        .where("id", id)
        .first()
        .returning("*");

      for (const description of validatedPage.description) {
        const getLanguage: any = await Language.query()
          .where("code", description.language)
          .first();

        if (getLanguage) {
          const isDescriptionExists = await PageDescription.query()
            .where("page_id", id)
            .andWhere("language_id", getLanguage.id)
            .first();
          if (isDescriptionExists) {
            await PageDescription.query()
              .update({
                name: description.name,
                description: description.description,
                meta_title: description.meta_title,
                meta_description: description.meta_description,
                meta_keywords: description.meta_keywords,
                slug: description.slug,
              } as any)
              .where("page_id", id)
              .andWhere("language_id", getLanguage.id);
          } else {
            await PageDescription.query().insert({
              name: description.name,
              description: description.description,
              meta_title: description.meta_title,
              meta_description: description.meta_description,
              meta_keywords: description.meta_keywords,
              slug: description.slug,
              page_id: id,
              language_id: getLanguage.id,
            } as any);
          }
        }
      }

      return updatedPage;
    },
    deletePage: async (_parent, { input }, { db }, _info) => {
      let validatedPage;
      try {
        validatedPage = await deletePageValidate.validateAsync(input);
      } catch (err) {
        throw new UserInputError(err.details[0].message);
      }

      let { id } = validatedPage;

      const deletedPage = await Page.query().deleteById(id).returning("*");

      if (!deletedPage) {
        throw new ValidationError(`Sayfa Bulunamadı.`);
      }

      return {
        success: true,
      };
    },
  },
};
