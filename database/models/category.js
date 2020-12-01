import { Model } from "objection";
import { tableNames } from "../tableNames";
import Joi from "joi";

export class Category extends Model {
  static get tableName() {
    return tableNames.category;
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
