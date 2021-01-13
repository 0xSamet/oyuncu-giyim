import Joi from "joi";
import { Model } from "objection";
import { tableNames } from "../tableNames";

export class DesktopMenuDescription extends Model {
  static get tableName() {
    return tableNames.desktop_menu_description;
  }

  static get relationMappings() {
    const { Language } = require("./localization/language");
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

export const addDesktopMenuValidate = Joi.object({
  sort_order: Joi.number().integer().required().allow(null),
  status: Joi.boolean().required(),
  is_divider: Joi.boolean().required(),
  description: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().trim().required(),
        href: Joi.string().trim().required().allow(""),
        target: Joi.string().trim().required().allow(""),
        icon_url: Joi.string().trim().required().allow(""),
        language: Joi.string().trim().required(),
      })
    )
    .unique((a, b) => a.language === b.language),
});

export const updateDesktopMenuValidate = Joi.object({
  id: Joi.string().trim().required(),
  sort_order: Joi.number().integer().required().allow(null),
  status: Joi.boolean().required(),
  is_divider: Joi.boolean().required(),
  description: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().trim().required(),
        href: Joi.string().trim().required().allow(""),
        target: Joi.string().trim().required().allow(""),
        icon_url: Joi.string().trim().required().allow(""),
        language: Joi.string().trim().required(),
      })
    )
    .unique((a, b) => a.language === b.language),
});

export const deleteDesktopMenuValidate = Joi.object({
  id: Joi.string().trim().required(),
});

export const sortDesktopMenuValidate = Joi.array()
  .items(
    Joi.object({
      id: Joi.string().trim().required(),
      sort_order: Joi.number().integer().required(),
    })
  )
  .unique((a, b) => a.id === b.id || a.sort_order === b.sort_order);

export class MobileMenuDescription extends Model {
  static get tableName() {
    return tableNames.mobile_menu_description;
  }

  static get relationMappings() {
    const { Language } = require("./localization/language");
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

export const addMobileMenuValidate = Joi.object({
  sort_order: Joi.number().integer().required().allow(null),
  status: Joi.boolean().required(),
  description: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().trim().required(),
        href: Joi.string().trim().required().allow(""),
        target: Joi.string().trim().required().allow(""),
        icon_url: Joi.string().trim().required().allow(""),
        language: Joi.string().trim().required(),
      })
    )
    .unique((a, b) => a.language === b.language),
});

export const updateMobileMenuValidate = Joi.object({
  id: Joi.string().trim().required(),
  sort_order: Joi.number().integer().required().allow(null),
  status: Joi.boolean().required(),
  description: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().trim().required(),
        href: Joi.string().trim().required().allow(""),
        target: Joi.string().trim().required().allow(""),
        icon_url: Joi.string().trim().required().allow(""),
        language: Joi.string().trim().required(),
      })
    )
    .unique((a, b) => a.language === b.language),
});

export const deleteMobileMenuValidate = Joi.object({
  id: Joi.string().trim().required(),
});

export const sortMobileMenuValidate = Joi.array()
  .items(
    Joi.object({
      id: Joi.string().trim().required(),
      sort_order: Joi.number().integer().required(),
    })
  )
  .unique((a, b) => a.id === b.id || a.sort_order === b.sort_order);
