export const resolvers = {
  Query: {
    menu: async (_parent, _args, _context) => {
      /*try {
        const menu = db.select().from("menu");
        return menu;
      } catch (err) {
        console.log(process.env.DB_HOST, err);
      } finally {
        //db.destroy();
      }*/
      console.log(_context);
      return [{ asd: "asd" }];
    },
    page: async (_parent, _args, _context) => {
      // console.log(await db("page"));
      // db.destroy();
      return [{ id: 1, text: "sad", icon: "", sort_order: 1 }];
    },
  },
  Mutation: {
    async addMenu(_p, args, ctx) {
      await db("menu").insert({ text: args.text, icon: "/asd", sort_order: 1 });
    },
  },
};
