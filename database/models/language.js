import { Model } from "objection";
import { tableNames } from "../tableNames";

export class Language extends Model {
  static get tableName() {
    return tableNames.language;
  }
}
