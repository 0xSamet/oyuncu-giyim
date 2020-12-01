import { Page } from "../../database/models/page";

export default {
  Query: {
    pages: async (_parent, { slug }, { db }, _info) => {
      const result = await Page.query();

      return result;
    },
    page: async (_parent, { slug }, { db }, _info) => {
      const result = await Page.query().where("slug", slug).first();

      return result;
    },
  },
};
