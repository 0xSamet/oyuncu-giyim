import Joi from "joi";
import { Model } from "objection";
import { tableNames } from "../../tableNames";
import { Country } from "./country";
import { Zone } from "./zone";

export class ZoneGeoZone extends Model {
  static get tableName() {
    return tableNames.zone_geo_zone;
  }
  static get relationMappings() {
    return {
      zone: {
        relation: Model.ManyToManyRelation,
        modelClass: Zone,
        join: {
          from: `${tableNames.zone_geo_zone}.zone_id`,
          to: `${tableNames.zone}.id`,
        },
      },
    };
  }
}
