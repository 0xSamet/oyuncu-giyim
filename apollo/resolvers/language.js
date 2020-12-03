import { Language } from "../../database/models/language";

export default {
  Query: {
    languages: async (_parent, { slug }, { db }, _info) => {
      const result = await Language.query();
      return result;
    },
  },
};
