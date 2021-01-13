import Joi from "joi";
import { Model } from "objection";
import { tableNames } from "../tableNames";

export class OptionValueDescription extends Model {
  static get tableName() {
    return tableNames.option_value_description;
  }

  static get relationMappings() {
    const { Language } = require("./localization/language");
    return {
      option_value: {
        relation: Model.BelongsToOneRelation,
        modelClass: OptionValue,
        join: {
          from: `${tableNames.option_value_description}.option_value_id`,
          to: `${tableNames.option_value}.id`,
        },
      },
      language: {
        relation: Model.BelongsToOneRelation,
        modelClass: Language,
        join: {
          from: `${tableNames.option_value_description}.language_id`,
          to: `${tableNames.language}.id`,
        },
      },
    };
  }
}

export class OptionValue extends Model {
  static get tableName() {
    return tableNames.option_value;
  }

  static get relationMappings() {
    return {
      option: {
        relation: Model.BelongsToOneRelation,
        modelClass: Option,
        join: {
          from: `${tableNames.option_description}.option_id`,
          to: `${tableNames.option}.id`,
        },
      },
      option_value_description: {
        relation: Model.HasManyRelation,
        modelClass: OptionValueDescription,
        join: {
          from: `${tableNames.option_value}.id`,
          to: `${tableNames.option_value_description}.option_value_id`,
        },
      },
    };
  }
}

export class OptionDescription extends Model {
  static get tableName() {
    return tableNames.option_description;
  }

  static get relationMappings() {
    const { Language } = require("./localization/language");
    return {
      option: {
        relation: Model.BelongsToOneRelation,
        modelClass: Option,
        join: {
          from: `${tableNames.option_description}.option_id`,
          to: `${tableNames.option}.id`,
        },
      },
      language: {
        relation: Model.BelongsToOneRelation,
        modelClass: Language,
        join: {
          from: `${tableNames.option_description}.language_id`,
          to: `${tableNames.language}.id`,
        },
      },
    };
  }
}

export class Option extends Model {
  static get tableName() {
    return tableNames.option;
  }
  static get relationMappings() {
    return {
      option_description: {
        relation: Model.HasManyRelation,
        modelClass: OptionDescription,
        join: {
          from: `${tableNames.option}.id`,
          to: `${tableNames.option_description}.option_id`,
        },
      },
    };
  }
}

export const addOptionValidate = Joi.object({
  type: Joi.string().trim().required(),
  sort_order: Joi.number().integer().required().allow(null),
  description: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().trim().required(),
        language: Joi.string().trim().required(),
      })
    )
    .unique((a, b) => a.language === b.language)
    .min(1),
  option_values: Joi.array()
    .items(
      Joi.object({
        sort_order: Joi.number().integer().required(),
        description: Joi.array()
          .items(
            Joi.object({
              name: Joi.string().trim().required(),
              language: Joi.string().trim().required(),
            })
          )
          .unique((a, b) => a.language === b.language),
      })
    )
    .min(1),
});

export const updateOptionValidate = Joi.object({
  id: Joi.string().trim().required(),
  type: Joi.string().trim().required(),
  sort_order: Joi.number().integer().required().allow(null),
  description: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().trim().required(),
        language: Joi.string().trim().required(),
      })
    )
    .unique((a, b) => a.language === b.language)
    .min(1),
  option_values: Joi.array().items(
    Joi.object({
      sort_order: Joi.number().integer().required(),
      description: Joi.array()
        .items(
          Joi.object({
            name: Joi.string().trim().required(),
            language: Joi.string().trim().required(),
          })
        )
        .unique((a, b) => a.language === b.language)
        .min(1),
    })
  ),
});

export const deleteOptionValidate = Joi.object({
  id: Joi.string().trim().required(),
});
