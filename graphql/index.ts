import { resolvers } from "./resolvers/index";
import neo4j from "neo4j-driver";
import { Neo4jGraphQL } from "@neo4j/graphql";
import { typeDefs } from "./typeDefs";

declare const process: {
  env: {
    NEXT_PUBLIC_JWT_SECRET: string;
    NEXT_PUBLIC_NEO4J_PASSWORD: string;
    NEXT_PUBLIC_NEO4J_USERNAME: string;
    NEXT_PUBLIC_NEO4J_URI: string;
  };
};
const {
  NEXT_PUBLIC_NEO4J_URI,
  NEXT_PUBLIC_NEO4J_USERNAME,
  NEXT_PUBLIC_NEO4J_PASSWORD,
} = process.env;

export const driver = neo4j.driver(
  NEXT_PUBLIC_NEO4J_URI,
  neo4j.auth.basic(NEXT_PUBLIC_NEO4J_USERNAME, NEXT_PUBLIC_NEO4J_PASSWORD),
);

const neoSchema = new Neo4jGraphQL({
  resolvers,
  typeDefs,
  driver,
  features: {
    authorization: {
      key: process.env.NEXT_PUBLIC_JWT_SECRET,
    },
  },
});

export const initServer = async () => {
  console.log("Building GraphQL server");
  return await neoSchema.getSchema();
};
