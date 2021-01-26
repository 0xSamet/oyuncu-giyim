import DataLoader from "dataloader";
import {
  Country,
  CountryDescription,
} from "../../../database/models/localization/country";
import tableNames from "../../../database/tableNames";

export const zoneCountryAdminLoader = new DataLoader(
  async (keys: Array<{ id: number; country_id: number }>) => {
    let response = {};
    const countries: any = await Country.query().whereIn(
      "id",
      keys.map((a) => a.country_id)
    );

    //console.log("desc", countries);

    countries.forEach((country) => {
      if (!response[country.id]) {
        response[country.id] = country;
      }
    });

    //console.log("res", response);

    return keys.map((zone) => {
      return response[zone.country_id];
    });
  }
);
