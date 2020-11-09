import { ApolloServer } from "apollo-server-micro";
import { schema } from "../../apollo/schema";
import Cors from "micro-cors";

const apolloServer = new ApolloServer({
  schema,
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
