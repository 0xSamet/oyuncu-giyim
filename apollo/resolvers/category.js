import { Category } from "../../database/models/category";

export default {
  Category: {
    parent: async (_parent, _params, { db }, _info) => {
      console.log(_parent);

      return {
        id: 2,
        name: "sweat2",
        sort_order: 1,
        parent_id: 1,
      };
    },
  },
  Query: {
    categories: async (_parent, _params, { db }, _info) => {
      const result = await Category.query();
      db.destroy();
      //console.log(result);

      return [
        {
          id: 1,
          name: "sweat",
          sort_order: 1,
          parent_id: 1,
        },
      ];
    },
  },
};
