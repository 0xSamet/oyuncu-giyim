import Joi from "joi";
import { Model } from "objection";
import { tableNames } from "../tableNames";

export class OptionType extends Model {
  static get tableName() {
    return tableNames.option_type;
  }
}

export const addOptionTypeValidate = Joi.object({
  name: Joi.string().trim().required(),

  sort_order: Joi.number().integer().required().allow(null),
});

export const updateOptionTypeValidate = Joi.object({
  id: Joi.string().trim().required(),
  name: Joi.string().trim().required(),
  sort_order: Joi.number().integer().required().allow(null),
});

export const deleteOptionTypeValidate = Joi.object({
  id: Joi.string().trim().required(),
});
