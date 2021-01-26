import DataLoader from "dataloader";
import {
  Country,
  CountryDescription,
} from "../../../database/models/localization/country";
import { ZoneGeoZone } from "../../../database/models/localization/zone_geo_zone";
import tableNames from "../../../database/tableNames";

export const geoZoneZonesAdminLoader = new DataLoader(
  async (keys: Array<{ id: number }>) => {
    let response = {};

    const zoneGeoZones: any = await ZoneGeoZone.query().whereIn(
      "geo_zone_id",
      keys.map((a) => a.id)
    );

    keys.forEach((key) => {
      response[key.id] = zoneGeoZones.filter((zoneGeoZone) => {
        return zoneGeoZone.geo_zone_id === key.id;
      });
    });

    return keys.map((key) => {
      return response[key.id];
    });
  }
);
