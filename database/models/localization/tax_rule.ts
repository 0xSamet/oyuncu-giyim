import Joi from "joi";
import { Model } from "objection";
import tableNames from "../../tableNames";

export class TaxRule extends Model {
  static get tableName() {
    return tableNames.tax_rule;
  }
}
