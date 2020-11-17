import { DesktopMenu, MobileMenu } from "../../database/models/menu";

export default {
  Query: {
    desktopMenu: async (_parent, _args, { db }, _info) => {
      const result = await DesktopMenu.query();
      db.destroy();
      return result;
    },
    mobileMenu: async (_parent, _args, { db }, _info) => {
      const result = await MobileMenu.query();
      db.destroy();
      return result;
    },
  },
  Mutation: {
    addDesktopMenu: async (_parent, { input }, { db }, _info) => {
      try {
        const { name, href, target, icon_url, is_divider } = input;

        const biggestSortOrder = await DesktopMenu.query()
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

        db.destroy();
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

        db.destroy();
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
      await DesktopMenu.query().deleteById(input.id);

      const result = {
        success: true,
      };
      db.destroy();
      return result;
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

        db.destroy();
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

        db.destroy();
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

        db.destroy();
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
      await MobileMenu.query().deleteById(input.id);

      const result = {
        success: true,
      };
      db.destroy();
      return result;
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
        db.destroy();
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
