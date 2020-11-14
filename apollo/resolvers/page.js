import { Page } from "../../database/models/page";

export default {
  Query: {
    pages: async (_parent, { slug }, { db }, _info) => {
      const result = await Page.query();
      db.destroy();
      return result;
    },
    page: async (_parent, { slug }, { db }, _info) => {
      const result = await Page.query().where("slug", slug).first();
      db.destroy();
      return result;
    },
  },
};
