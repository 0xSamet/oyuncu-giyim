import Joi from "joi";
import { Model } from "objection";
import tableNames from "../../tableNames";

export class GeoZone extends Model {
  static get tableName() {
    return tableNames.geo_zone;
  }
}

export const addGeoZoneValidate = Joi.object({
  name: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  sort_order: Joi.number().integer().required().allow(null),
  zones: Joi.array().items(
    Joi.object({
      country_id: Joi.number().integer().required(),
      zone_id: Joi.number().integer().required(),
    })
  ),
});

export const updateGeoZoneValidate = Joi.object({
  id: Joi.string().trim().required(),
  name: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  sort_order: Joi.number().integer().required().allow(null),
  zones: Joi.array().items(
    Joi.object({
      country_id: Joi.number().integer().required(),
      zone_id: Joi.number().integer().required(),
    })
  ),
});

export const deleteGeoZoneValidate = Joi.object({
  id: Joi.string().trim().required(),
});
