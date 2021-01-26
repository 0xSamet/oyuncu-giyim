import Joi from "joi";
import { Model } from "objection";
import tableNames from "../../tableNames";

export class CountryDescription extends Model {
  static get tableName() {
    return tableNames.country_description;
  }

  static get relationMappings() {
    const { Language } = require("./language");
    return {
      country: {
        relation: Model.BelongsToOneRelation,
        modelClass: Country,
        join: {
          from: `${tableNames.country_description}.country_id`,
          to: `${tableNames.country}.id`,
        },
      },
      language: {
        relation: Model.BelongsToOneRelation,
        modelClass: Language,
        join: {
          from: `${tableNames.country_description}.language_id`,
          to: `${tableNames.language}.id`,
        },
      },
    };
  }
}

export class Country extends Model {
  static get tableName() {
    return tableNames.country;
  }

  static get relationMappings() {
    const { Zone } = require("./zone");
    return {
      country_description: {
        relation: Model.HasManyRelation,
        modelClass: CountryDescription,
        join: {
          from: `${tableNames.country}.id`,
          to: `${tableNames.country_description}.country_id`,
        },
      },
      zone: {
        relation: Model.HasManyRelation,
        modelClass: Zone,
        join: {
          from: `${tableNames.country}.id`,
          to: `${tableNames.zone}.country_id`,
        },
      },
    };
  }
}

export const addCountryValidate = Joi.object({
  sort_order: Joi.number().integer().required().allow(null),
  status: Joi.boolean().required(),
  description: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().trim().required(),
        language: Joi.string().trim().required(),
      })
    )
    .unique((a, b) => a.language === b.language),
});

export const updateCountryValidate = Joi.object({
  id: Joi.string().trim().required(),
  sort_order: Joi.number().integer().required().allow(null),
  status: Joi.boolean().required(),
  description: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().trim().required(),
        language: Joi.string().trim().required(),
      })
    )
    .unique((a, b) => a.language === b.language),
});

export const deleteCountryValidate = Joi.object({
  id: Joi.string().trim().required(),
});
