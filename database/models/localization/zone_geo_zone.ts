import { Model } from "objection";
import tableNames from "../../tableNames";

export class ZoneGeoZone extends Model {
  static get tableName() {
    return tableNames.zone_geo_zone;
  }
  static get relationMappings() {
    const { Zone } = require("./zone");
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
