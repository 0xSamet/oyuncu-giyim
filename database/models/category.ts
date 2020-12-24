import { Model } from "objection";
import { tableNames } from "../tableNames";
import Joi from "joi";

export class CategoryDescription extends Model {
  static get tableName() {
    return tableNames.category_description;
  }

  static get relationMappings() {
    const { Language } = require("./language");
    return {
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: `${tableNames.category_description}.category_id`,
          to: `${tableNames.category}.id`,
        },
      },
      language: {
        relation: Model.BelongsToOneRelation,
        modelClass: Language,
        join: {
          from: `${tableNames.category_description}.language_id`,
          to: `${tableNames.language}.id`,
        },
      },
    };
  }
}

export class Category extends Model {
  static get tableName() {
    return tableNames.category;
  }

  static get relationMappings() {
    return {
      category_description: {
        relation: Model.HasManyRelation,
        modelClass: CategoryDescription,
        join: {
          from: `${tableNames.category}.id`,
          to: `${tableNames.category_description}.category_id`,
        },
      },
    };
  }
}

export const addCategoryValidate = Joi.object({
  sort_order: Joi.number().integer().required().allow(null),
  parent_id: Joi.number().integer().required().allow(null),
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

export const updateCategoryValidate = Joi.object({
  id: Joi.string().trim().required(),
  sort_order: Joi.number().integer().required().allow(null),
  parent_id: Joi.number().integer().required().allow(null),
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

export const deleteCategoryValidate = Joi.object({
  id: Joi.string().trim().required(),
});
