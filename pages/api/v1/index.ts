import knex from "knex";
import dbConfig from "../../../knexfile";
import { Model, ValidationError } from "objection";
import { ApolloError, ApolloServer } from "apollo-server-micro";
import { schema } from "../../../apollo/schema";
import { parentCategoriesLoader } from "../../../apollo/dataloaders";
import { GraphQLError } from "graphql";
import { v4 as uuidv4 } from "uuid";

const apolloServer = new ApolloServer({
  schema,
  context: () => {
    //console.log("geldi");
    const configToUse = process.env.NODE_ENV || "development";

    const db = knex(dbConfig[configToUse]);

    Model.knex(db);
    return {
      db,
      loaders: {
        parentCategoriesLoader,
      },
    };
  },
  formatError: (error: GraphQLError) => {
    if (error.originalError instanceof ValidationError) {
      return new GraphQLError(error.message);
    }

    if (error.originalError instanceof ApolloError) {
      return error;
    }

    const errorId = uuidv4();
    console.log(Object.keys(error));
    console.log(error);
    return new GraphQLError("Internal Error : " + errorId);
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/v1" });
