import {
  ApolloError,
  ApolloServer,
  Config,
  UserInputError,
  ValidationError,
} from "apollo-server-micro";
import { schema } from "../../../apollo/schema";
import { parentCategoriesLoader } from "../../../apollo/dataloaders";
import { GraphQLError } from "graphql";
import { v4 as uuidv4 } from "uuid";
import db from "../../../database/connect";

const apolloServer = new ApolloServer({
  schema,
  context: () => {
    return {
      db,
      loaders: {
        parentCategoriesLoader,
      },
    };
  },
  formatError: (error: GraphQLError) => {
    if (
      error.originalError instanceof ValidationError ||
      error instanceof ValidationError
    ) {
      console.log("ValidationError");
      return new ValidationError(error.message);
    }

    if (error.originalError instanceof UserInputError) {
      console.log("UserInputError");
      return new UserInputError(error.message);
    }

    if (error.originalError instanceof ApolloError) {
      console.log("ApolloError");
      return error;
    }

    const errorId = uuidv4();
    console.log("Internal Error");
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
