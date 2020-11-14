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
};
