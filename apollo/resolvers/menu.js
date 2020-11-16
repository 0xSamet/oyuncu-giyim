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
    updateDesktopMenu: async (_parent, { input }, { db }, _info) => {
      const {
        id,
        name,
        href,
        target,
        icon_url,
        sort_order,
        is_divider,
      } = input;

      const result = await DesktopMenu.query()
        .where("id", id)
        .first()
        .update({
          name,
          href,
          target,
          icon_url,
          sort_order,
          is_divider,
        })
        .returning("*");
      db.destroy();
      return result;
    },
    addDesktopMenu: async (_parent, { input }, { db }, _info) => {
      const { name, href, target, icon_url, is_divider } = input;

      const biggestSortOrder = await DesktopMenu.query()
        .select("sort_order")
        .orderBy([{ column: "sort_order", order: "DESC" }])
        .first();

      const result = await DesktopMenu.query()
        .insert({
          name,
          href,
          target,
          icon_url,
          sort_order: biggestSortOrder.sort_order + 1,
          is_divider,
        })
        .returning("*");
      db.destroy();
      return result;
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
      for (const menu of input) {
        await DesktopMenu.query()
          .update({
            sort_order: menu.sort_order,
          })
          .where("id", menu.id);
      }

      const result = {
        success: true,
      };
      db.destroy();
      return result;
    },
  },
};
