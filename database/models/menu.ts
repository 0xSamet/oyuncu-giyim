import { Model } from "objection";
import { tableNames } from "../tableNames";

export class DesktopMenuDescription extends Model {
  static get tableName() {
    return tableNames.desktop_menu_description;
  }

  static get relationMappings() {
    const { Language } = require("./language");
    return {
      desktop_menu: {
        relation: Model.BelongsToOneRelation,
        modelClass: DesktopMenu,
        join: {
          from: `${tableNames.desktop_menu_description}.desktop_menu_id`,
          to: `${tableNames.desktop_menu}.id`,
        },
      },
      language: {
        relation: Model.BelongsToOneRelation,
        modelClass: Language,
        join: {
          from: `${tableNames.desktop_menu_description}.language_id`,
          to: `${tableNames.language}.id`,
        },
      },
    };
  }
}

export class DesktopMenu extends Model {
  static get tableName() {
    return tableNames.desktop_menu;
  }

  static get relationMappings() {
    return {
      desktop_menu_description: {
        relation: Model.HasManyRelation,
        modelClass: DesktopMenuDescription,
        join: {
          from: `${tableNames.desktop_menu}.id`,
          to: `${tableNames.desktop_menu_description}.desktop_menu_id`,
        },
      },
    };
  }
}

export class MobileMenuDescription extends Model {
  static get tableName() {
    return tableNames.mobile_menu_description;
  }

  static get relationMappings() {
    const { Language } = require("./language");
    return {
      mobile_menu: {
        relation: Model.BelongsToOneRelation,
        modelClass: MobileMenu,
        join: {
          from: `${tableNames.mobile_menu_description}.mobile_menu_id`,
          to: `${tableNames.mobile_menu}.id`,
        },
      },
      language: {
        relation: Model.BelongsToOneRelation,
        modelClass: Language,
        join: {
          from: `${tableNames.mobile_menu_description}.language_id`,
          to: `${tableNames.language}.id`,
        },
      },
    };
  }
}

export class MobileMenu extends Model {
  static get tableName() {
    return tableNames.mobile_menu;
  }
  static get relationMappings() {
    return {
      mobile_menu_description: {
        relation: Model.HasManyRelation,
        modelClass: MobileMenuDescription,
        join: {
          from: `${tableNames.mobile_menu}.id`,
          to: `${tableNames.mobile_menu_description}.mobile_menu_id`,
        },
      },
    };
  }
}
