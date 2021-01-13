import DataLoader from "dataloader";
import { CountryDescription } from "../../../database/models/localization/country";
import { Zone } from "../../../database/models/localization/zone";
import { tableNames } from "../../../database/tableNames";

export const countryDescriptionLoader = new DataLoader(
  async (keys: Array<{ id: number; language: "string" }>) => {
    const language = keys[0].language;

    let response = {};

    const descriptions: any = await CountryDescription.query()
      .select("country_id", `${tableNames.country_description}.name`)
      .joinRelated(tableNames.language)
      .where("code", language);

    descriptions.forEach((description) => {
      response[description.country_id] = description;
    });

    return keys.map((country) => {
      return response[country.id];
    });
  }
);

export const countryDescriptionAdminLoader = new DataLoader(async (keys) => {
  let response = {};

  const descriptions = await CountryDescription.query()
    .select(
      "country_id",
      `${tableNames.country_description}.name`,
      "code as language"
    )
    .joinRelated(tableNames.language)
    .whereIn(
      "country_id",
      keys.map((country: any) => country.id)
    );

  keys.forEach((country: any) => {
    response[country.id] = descriptions.filter((description: any) => {
      return description.country_id === country.id;
    });
  });

  return keys.map((country: any) => {
    return response[country.id];
  });
});
