import Joi from "joi";
import { Model } from "objection";
import { tableNames } from "../tableNames";

export class Language extends Model {
  static get tableName() {
    return tableNames.language;
  }
}

export const addLanguageValidate = Joi.object({
  name: Joi.string().trim().required(),
  code: Joi.string().trim().required(),
  flag_code: Joi.string().trim().required(),
  sort_order: Joi.number().integer().required().allow(null),
  status: Joi.boolean().required(),
});

export const updateLanguageValidate = Joi.object({
  id: Joi.string().trim().required(),
  name: Joi.string().trim().required(),
  code: Joi.string().trim().required(),
  flag_code: Joi.string().trim().required(),
  sort_order: Joi.number().integer().required().allow(null),
  status: Joi.boolean().required(),
});

export const deleteLanguageValidate = Joi.object({
  id: Joi.string().trim().required(),
});
