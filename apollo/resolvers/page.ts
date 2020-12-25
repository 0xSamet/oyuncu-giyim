import { UserInputError, ValidationError } from "apollo-server-micro";
import { Language } from "../../database/models/language";
import {
  addPageValidate,
  deletePageValidate,
  Page,
  PageDescription,
  updatePageValidate,
} from "../../database/models/page";

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
  Query: {
    pages: async (_parent, { slug }, { db }, _info) => {
      const result = await Page.query();

      return result;
    },
    page: async (_parent, { slug }, { db }, _info) => {
      const result = await Page.query().where("slug", slug).first();

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
        usingBy: null,
      };

      for (const description of validatedPage.description) {
        const isExists: any = await PageDescription.query()
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

      const pageAdded: any = await Page.query().insert({
        status,
        desktop_menu_id,
        mobile_menu_id,
        sort_order: biggestSortOrder
          ? biggestSortOrder.sort_order + 1
          : sort_order,
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
        usingBy: null,
      };

      for (const description of validatedPage.description) {
        const isExists: any = await PageDescription.query()
          .where("slug", description.slug)
          .first();

        if (isExists && isExists.page_id != id) {
          isSlugExists = {
            status: true,
            usingBy: isExists.name,
          };
          break;
        }
      }

      if (isSlugExists.status) {
        throw new ValidationError(
          `Slug ${isSlugExists.usingBy} sayfasında kullanılıyor.`
        );
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
