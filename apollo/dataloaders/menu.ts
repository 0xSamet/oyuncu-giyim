import DataLoader from "dataloader";
//import db from "../../database/connect";
import {
  DesktopMenuDescription,
  MobileMenuDescription,
} from "../../database/models/menu";
import tableNames from "../../database/tableNames";

export const desktopMenuDescriptionLoader = new DataLoader(
  async (keys: Array<{ id: number; language: "string" }>) => {
    const language = keys[0].language;

    let response = {};

    const descriptions: any = await DesktopMenuDescription.query()
      .select(
        "desktop_menu_id",
        `${tableNames.desktop_menu_description}.name`,
        "href",
        "target",
        "icon_url"
      )
      .joinRelated(tableNames.language)
      .where("code", language);

    descriptions.forEach((description) => {
      response[description.desktop_menu_id] = description;
    });

    return keys.map((menu) => {
      return response[menu.id];
    });
  }
);

export const desktopMenuDescriptionAdminLoader = new DataLoader(
  async (keys: Array<{ id: number }>) => {
    let response = {};

    const descriptions: any = await DesktopMenuDescription.query()
      .select(
        "desktop_menu_id",
        `${tableNames.desktop_menu_description}.name`,
        "href",
        "target",
        "icon_url",
        "code as language"
      )
      .joinRelated(tableNames.language)
      .whereIn(
        "desktop_menu_id",
        keys.map((menu) => menu.id)
      );

    keys.forEach((menu) => {
      response[menu.id] = descriptions.filter((description) => {
        return description.desktop_menu_id === menu.id;
      });
    });

    return keys.map((menu) => {
      return response[menu.id];
    });
  }
);

export const mobileMenuDescriptionLoader = new DataLoader(
  async (keys: Array<{ id: number; language: "string" }>) => {
    const language = keys[0].language;

    let response = {};

    const descriptions: any = await MobileMenuDescription.query()
      .select(
        "mobile_menu_id",
        `${tableNames.mobile_menu_description}.name`,
        "href",
        "target",
        "icon_url"
      )
      .joinRelated(tableNames.language)
      .where("code", language);

    descriptions.forEach((description) => {
      response[description.mobile_menu_id] = description;
    });

    return keys.map((menu) => {
      return response[menu.id];
    });
  }
);

export const mobileMenuDescriptionAdminLoader = new DataLoader(
  async (keys: Array<{ id: number }>) => {
    let response = {};

    const descriptions: any = await MobileMenuDescription.query()
      .select(
        "mobile_menu_id",
        `${tableNames.mobile_menu_description}.name`,
        "href",
        "target",
        "icon_url",
        "code as language"
      )
      .joinRelated(tableNames.language)
      .whereIn(
        "mobile_menu_id",
        keys.map((menu) => menu.id)
      );

    keys.forEach((menu) => {
      response[menu.id] = descriptions.filter((description) => {
        return description.mobile_menu_id === menu.id;
      });
    });

    return keys.map((menu) => {
      return response[menu.id];
    });
  }
);
