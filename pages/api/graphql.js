import { gql, ApolloServer } from "apollo-server-micro";
import connectDb from "../../utils/connectDb";
import Category from "../../database/models/Category";

connectDb();

const typeDefs = gql`
  type Hello{
    id: Int
    name: String
      
  }
  type Query {
    hello: [Hello]
  }
  type Mutation{
    addhello(text: String) : String 
  }
`;

const resolvers = {
  Query: {
    hello: (_parent, _args, _context) => {
      return Category.find({});
    }
  },
  Mutation: {
    async addhello(_p, args, ctx) {
      const category = new Category({
        id: 1,
        name: "samet"
      });
      await category.save();
      console.log(category);
    }
  }
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
});

const handler = apolloServer.createHandler({ path: "/api/graphql" });

export const config = {
  api: {
    bodyParser: false
  }
};

export default handler;