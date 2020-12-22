import { DesktopMenu, MobileMenu } from "../../database/models/menu";
import { getLanguage } from "./helpers";

export default {
  DesktopMenu: {
    description: async (
      parent,
      params,
      { loaders: { desktopMenuDescriptionLoader }, req },
      _info
    ) => {
      return desktopMenuDescriptionLoader.load({
        id: parent.id,
        language: req.language,
      });
    },
  },
  DesktopMenuOnAdmin: {
    description: async (
      parent,
      params,
      { loaders: { desktopMenuDescriptionAdminLoader } },
      _info
    ) => {
      return desktopMenuDescriptionAdminLoader.load({
        id: parent.id,
      });
    },
  },
  MobileMenu: {
    description: async (
      parent,
      params,
      { loaders: { mobileMenuDescriptionLoader }, req },
      _info
    ) => {
      return mobileMenuDescriptionLoader.load({
        id: parent.id,
        language: req.language,
      });
    },
  },
  MobileMenuOnAdmin: {
    description: async (
      parent,
      params,
      { loaders: { mobileMenuDescriptionAdminLoader } },
      _info
    ) => {
      return mobileMenuDescriptionAdminLoader.load({
        id: parent.id,
      });
    },
  },
  Query: {
    desktopMenu: async (_parent, params, { req }, _info) => {
      const result = await DesktopMenu.query();
      req.language = await getLanguage(params);
      return result;
    },
    desktopMenuOnAdmin: async (_parent, params, { db, req }, _info) => {
      const result = await DesktopMenu.query();
      return result;
    },
    mobileMenu: async (_parent, params, { req }, _info) => {
      const result = await MobileMenu.query();
      req.language = await getLanguage(params);
      return result;
    },
    mobileMenuOnAdmin: async (_parent, params, { req }, _info) => {
      const result = await MobileMenu.query();
      return result;
    },
  },
  Mutation: {
    addDesktopMenu: async (_parent, { input }, { db }, _info) => {
      try {
        const { name, href, target, icon_url, is_divider } = input;

        const biggestSortOrder: any = await DesktopMenu.query()
          .select("sort_order")
          .orderBy([{ column: "sort_order", order: "DESC" }])
          .first();

        await DesktopMenu.query().insert({
          name,
          href,
          target,
          icon_url,
          sort_order: biggestSortOrder.sort_order + 1,
          is_divider,
        });

        return {
          success: true,
        };
      } catch (err) {
        console.log(err);
        return {
          success: false,
        };
      }
    },
    updateDesktopMenu: async (_parent, { input }, { db }, _info) => {
      try {
        const { id, name, href, target, icon_url, is_divider } = input;

        await DesktopMenu.query().where("id", id).first().update({
          name,
          href,
          target,
          icon_url,
          is_divider,
        });

        return {
          success: true,
        };
      } catch (err) {
        console.log(err);
        return {
          success: false,
        };
      }
    },
    deleteDesktopMenu: async (_parent, { input }, { db }, _info) => {
      try {
        await DesktopMenu.query().deleteById(input.id);

        return {
          success: true,
        };
      } catch (err) {
        console.log(err);
        return {
          success: false,
        };
      }
    },
    sortDesktopMenu: async (_parent, { input }, { db }, _info) => {
      try {
        for (const menu of input) {
          await DesktopMenu.query()
            .update({
              sort_order: menu.sort_order,
            })
            .where("id", menu.id);
        }

        return {
          success: true,
        };
      } catch (err) {
        console.log(err);
        return {
          success: false,
        };
      }
    },
    addMobileMenu: async (_parent, { input }, { db }, _info) => {
      try {
        const { name, href, target, icon_url } = input;

        const biggestSortOrder = await MobileMenu.query()
          .select("sort_order")
          .orderBy([{ column: "sort_order", order: "DESC" }])
          .first();

        await MobileMenu.query().insert({
          name,
          href,
          target,
          icon_url,
          sort_order: biggestSortOrder.sort_order + 1,
        });

        return {
          success: true,
        };
      } catch (err) {
        console.log(err);
        return {
          success: false,
        };
      }
    },
    updateMobileMenu: async (_parent, { input }, { db }, _info) => {
      try {
        const { id, name, href, target, icon_url } = input;

        await MobileMenu.query().where("id", id).first().update({
          name,
          href,
          target,
          icon_url,
        });

        return {
          success: true,
        };
      } catch (err) {
        console.log(err);
        return {
          success: false,
        };
      }
    },
    deleteMobileMenu: async (_parent, { input }, { db }, _info) => {
      try {
        await MobileMenu.query().deleteById(input.id);

        return {
          success: true,
        };
      } catch (err) {
        console.log(err);
        return {
          success: false,
        };
      }
    },
    sortMobileMenu: async (_parent, { input }, { db }, _info) => {
      try {
        for (const menu of input) {
          await MobileMenu.query()
            .update({
              sort_order: menu.sort_order,
            })
            .where("id", menu.id);
        }

        return {
          success: true,
        };
      } catch (err) {
        console.log(err);
        return {
          success: false,
        };
      }
    },
  },
};
