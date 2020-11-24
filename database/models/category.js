import { Model } from "objection";
import { tableNames } from "../tableNames";

export class Category extends Model {
  static get tableName() {
    return tableNames.category;
  }
}
