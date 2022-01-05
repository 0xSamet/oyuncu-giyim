import Joi from "joi";
import { Model } from "objection";
import tableNames from "../../tableNames";

export class StockStatus extends Model {
  static get tableName() {
    return tableNames.stock_status;
  }
}

export const addStockStatusValidate = Joi.array()
  .items(
    Joi.object({
      name: Joi.string().trim().required(),
      language: Joi.string().trim().required(),
    })
  )
  .unique((a, b) => a.language === b.language);

export const updateStockStatusValidate = Joi.array()
  .items(
    Joi.object({
      id: Joi.string().trim().required(),
      name: Joi.string().trim().required(),
      language: Joi.string().trim().required(),
    })
  )
  .unique((a, b) => a.language === b.language);

export const deleteStockStatusValidate = Joi.object({
  id: Joi.string().trim().required(),
});
