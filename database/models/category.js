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
  name: Joi.string().trim().required(),
  meta_title: Joi.string().trim().required().allow(""),
  meta_description: Joi.string().trim().required().allow(""),
  meta_keyword: Joi.string().trim().required().allow(""),
  name: Joi.string().trim().required(),
  name: Joi.string().trim().required(),
  sort_order: Joi.number().integer().required().allow(null),
  parent_id: Joi.number().integer().required().allow(null),
  status: Joi.boolean().required(),
  slug: Joi.string().trim().required(),
});

export const updateCategoryValidate = Joi.object({
  id: Joi.string().trim().required(),
  name: Joi.string().trim().required(),
  meta_title: Joi.string().trim().required().allow(""),
  meta_description: Joi.string().trim().required().allow(""),
  meta_keyword: Joi.string().trim().required().allow(""),
  sort_order: Joi.number().integer().required().allow(null),
  parent_id: Joi.number().integer().required().allow(null),
  status: Joi.boolean().required(),
  slug: Joi.string().trim().required(),
});

export const deleteCategoryValidate = Joi.object({
  id: Joi.string().trim().required(),
});
