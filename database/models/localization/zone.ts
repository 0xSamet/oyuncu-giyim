import Joi from "joi";
import { Model } from "objection";
import tableNames from "../../tableNames";

export class Zone extends Model {
  static get tableName() {
    return tableNames.zone;
  }
  static get relationMappings() {
    const { Country } = require("./country");
    return {
      country: {
        relation: Model.BelongsToOneRelation,
        modelClass: Country,
        join: {
          from: `${tableNames.zone}.country_id`,
          to: `${tableNames.country}.id`,
        },
      },
    };
  }
}

export const addZoneValidate = Joi.object({
  name: Joi.string().trim().required(),
  country_id: Joi.number().integer().required(),
  sort_order: Joi.number().integer().required().allow(null),
  status: Joi.boolean().required(),
});

export const updateZoneValidate = Joi.object({
  id: Joi.string().trim().required(),
  name: Joi.string().trim().required(),
  country_id: Joi.number().integer().required(),
  sort_order: Joi.number().integer().required().allow(null),
  status: Joi.boolean().required(),
});

export const deleteZoneValidate = Joi.object({
  id: Joi.string().trim().required(),
});
