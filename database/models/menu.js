import { Model } from "objection";
import { tableNames } from "../tableNames";

export class DesktopMenu extends Model {
  static get tableName() {
    return tableNames.desktop_menu;
  }
}

export class MobileMenu extends Model {
  static get tableName() {
    return tableNames.mobile_menu;
  }
}
