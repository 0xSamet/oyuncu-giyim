import Joi from "joi";
import { Model } from "objection";
import { tableNames } from "../tableNames";

export class PageDescription extends Model {
  static get tableName() {
    return tableNames.page_description;
  }

  static get relationMappings() {
    const { Language } = require("./localization/language");
    return {
      page: {
        relation: Model.BelongsToOneRelation,
        modelClass: Page,
        join: {
          from: `${tableNames.page_description}.page_id`,
          to: `${tableNames.page}.id`,
        },
      },
      language: {
        relation: Model.BelongsToOneRelation,
        modelClass: Language,
        join: {
          from: `${tableNames.page_description}.language_id`,
          to: `${tableNames.language}.id`,
        },
      },
    };
  }
}

export class Page extends Model {
  static get tableName() {
    return tableNames.page;
  }

  static get relationMappings() {
    return {
      page_description: {
        relation: Model.HasManyRelation,
        modelClass: PageDescription,
        join: {
          from: `${tableNames.page}.id`,
          to: `${tableNames.page_description}.page_id`,
        },
      },
    };
  }
}

export const addPageValidate = Joi.object({
  sort_order: Joi.number().integer().required().allow(null),
  desktop_menu_id: Joi.number().integer().required().allow(null),
  mobile_menu_id: Joi.number().integer().required().allow(null),
  status: Joi.boolean().required(),
  description: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().trim().required(),
        description: Joi.string().trim().required().allow(""),
        meta_title: Joi.string().trim().required().allow(""),
        meta_description: Joi.string().trim().required().allow(""),
        meta_keywords: Joi.string().trim().required().allow(""),
        language: Joi.string().trim().required(),
        slug: Joi.string().trim().required(),
      })
    )
    .unique((a, b) => a.language === b.language),
});

export const updatePageValidate = Joi.object({
  id: Joi.string().trim().required(),
  sort_order: Joi.number().integer().required().allow(null),
  desktop_menu_id: Joi.number().integer().required().allow(null),
  mobile_menu_id: Joi.number().integer().required().allow(null),
  status: Joi.boolean().required(),
  description: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().trim().required(),
        description: Joi.string().trim().required().allow(""),
        meta_title: Joi.string().trim().required().allow(""),
        meta_description: Joi.string().trim().required().allow(""),
        meta_keywords: Joi.string().trim().required().allow(""),
        language: Joi.string().trim().required(),
        slug: Joi.string().trim().required(),
      })
    )
    .unique((a, b) => a.language === b.language),
});

export const deletePageValidate = Joi.object({
  id: Joi.string().trim().required(),
});
