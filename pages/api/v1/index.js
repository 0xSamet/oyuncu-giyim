import knex from "knex";
import dbConfig from "../../../knexfile";
const { Model } = require("objection");

import { ApolloServer } from "apollo-server-micro";
import { schema } from "../../../apollo/schema";

const apolloServer = new ApolloServer({
  schema,
  context: () => {
    //console.log("geldi");
    const configToUse = process.env.NODE_ENV || "development";

    const db = knex(dbConfig[configToUse]);

    Model.knex(db);
    return {
      db,
    };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/v1" });
