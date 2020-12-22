import { Model } from "objection";
import { tableNames } from "../tableNames";

export class Page extends Model {
  static get tableName() {
    return tableNames.page;
  }
}
