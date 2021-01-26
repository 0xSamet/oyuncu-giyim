import Joi from "joi";
import { Model } from "objection";
import tableNames from "../../tableNames";

export class TaxRate extends Model {
  static get tableName() {
    return tableNames.tax_rate;
  }
  static get relationMappings() {
    const { GeoZone } = require("./geo_zone");
    return {
      geo_zone: {
        relation: Model.BelongsToOneRelation,
        modelClass: GeoZone,
        join: {
          from: `${tableNames.tax_rate}.geo_zone_id`,
          to: `${tableNames.geo_zone}.id`,
        },
      },
    };
  }
}

export const addTaxRateValidate = Joi.object({
  name: Joi.string().trim().required(),
  geo_zone_id: Joi.number().integer().required(),
  sort_order: Joi.number().integer().required().allow(null),
  rate: Joi.number().required(),
  type: Joi.string().trim().required(),
});

export const updateTaxRateValidate = Joi.object({
  id: Joi.string().trim().required(),
  name: Joi.string().trim().required(),
  geo_zone_id: Joi.number().integer().required(),
  sort_order: Joi.number().integer().required().allow(null),
  rate: Joi.number().required(),
  type: Joi.string().trim().required(),
});

export const deleteTaxRateValidate = Joi.object({
  id: Joi.string().trim().required(),
});
