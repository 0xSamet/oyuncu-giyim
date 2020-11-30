import { Category } from "../../database/models/category";

export default {
  Category: {
    parents: async (parent, _params, { db, parentCategoriesLoader }, _info) => {
      return parentCategoriesLoader.load(parent);
      return [];
    },
  },
  Query: {
    categories: async (_parent, _params, { db }, _info) => {
      const result = await Category.query();

      //console.log(result);

      db.destroy();
      //console.log(result);

      return result;
    },
  },
  Mutation: {
    addCategory: async (_parent, { input }, { db }, _info) => {
      try {
        let { name, parent_id, sort_order, status, slug } = input;
        let biggestSortOrder;
        if (!sort_order && sort_order != 0) {
          biggestSortOrder = await Category.query()
            .select("sort_order")
            .orderBy([{ column: "sort_order", order: "DESC" }])
            .first();
        }

        await Category.query().insert({
          name,
          parent_id,
          sort_order: biggestSortOrder
            ? biggestSortOrder.sort_order + 1
            : sort_order,
          status,
          slug,
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
    updateCategory: async (_parent, { input }, { db }, _info) => {
      try {
        let { id, name, parent_id, sort_order, status, slug } = input;
        let biggestSortOrder;

        if (!sort_order && sort_order != 0) {
          biggestSortOrder = await Category.query()
            .select("sort_order")
            .orderBy([{ column: "sort_order", order: "DESC" }])
            .first();
        }

        await Category.query()
          .where("id", id)
          .first()
          .update({
            name,
            parent_id,
            sort_order: biggestSortOrder
              ? biggestSortOrder.sort_order + 1
              : sort_order,
            status,
            slug,
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
    deleteCategory: async (_parent, { input }, { db }, _info) => {
      try {
        let { id } = input;

        await Category.query().deleteById(id);

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
