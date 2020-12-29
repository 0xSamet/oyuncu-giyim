import Joi from "joi";
import { Model } from "objection";
import { tableNames } from "../tableNames";

export class OptionType extends Model {
  static get tableName() {
    return tableNames.option_type;
  }
}

export const addOptionValidate = Joi.object({
  option_type: Joi.string().trim().required(),
  sort_order: Joi.number().integer().required().allow(null),
  description: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().trim().required(),
        language: Joi.string().trim().required(),
      })
    )
    .unique((a, b) => a.language === b.language),
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
        .unique((a, b) => a.language === b.language),
    })
  ),
});

// export const updateOptionTypeValidate = Joi.object({
//   id: Joi.string().trim().required(),
//   name: Joi.string().trim().required(),
//   sort_order: Joi.number().integer().required().allow(null),
// });

// export const deleteOptionTypeValidate = Joi.object({
//   id: Joi.string().trim().required(),
// });
