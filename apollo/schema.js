import { makeExecutableSchema } from "graphql-tools";
import { typeDefs } from "./type-defs";
const { mergeResolvers } = require("@graphql-tools/merge");

import menuResolver from "./resolvers/menu";
import pageResolver from "./resolvers/page";

const resolvers = [menuResolver, pageResolver];

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: mergeResolvers(resolvers),
});
