import { ApolloServer } from "apollo-server-micro";
import { schema } from "../../apollo/schema";
import Cors from "micro-cors";
import knex from "knex";
import dbConfig from "../../knexfile";

const apolloServer = new ApolloServer({
  schema,
  context: () => {
    try {
      var db = knex(dbConfig);
    } catch (err) {
      console.log(err);
    }
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

const cors = Cors({
  allowMethods: ["POST", "GET", "OPTIONS", "DELETE", "PUT"],
  allowCredentials: true,
});

const handler = apolloServer.createHandler({ path: "/api" });
export default cors(handler);
