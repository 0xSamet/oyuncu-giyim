import Joi from "joi";
import { Model } from "objection";
import tableNames from "../../tableNames";

export class TaxClass extends Model {
  static get tableName() {
    return tableNames.tax_class;
  }
}

export const addTaxClassValidate = Joi.object({
  name: Joi.string().trim().required(),
  description: Joi.string().trim().required().allow(""),
  sort_order: Joi.number().integer().required().allow(null),
  tax_rules: Joi.array().items(
    Joi.object({
      tax_rate_id: Joi.number().integer().required(),
      priority: Joi.number().integer().required(),
    })
  ),
});

export const updateTaxClassValidate = Joi.object({
  id: Joi.string().trim().required(),
  name: Joi.string().trim().required(),
  description: Joi.string().trim().required().allow(""),
  sort_order: Joi.number().integer().required().allow(null),
  tax_rules: Joi.array().items(
    Joi.object({
      tax_rate_id: Joi.number().integer().required(),
      priority: Joi.number().integer().required(),
    })
  ),
});

export const deleteTaxClassValidate = Joi.object({
  id: Joi.string().trim().required(),
});
