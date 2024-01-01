import { initServer } from "@/graphql";
import { createYoga } from "graphql-yoga";
import { useJWT } from "@graphql-yoga/plugin-jwt";

declare const process: {
  env: {
    NEXT_PUBLIC_JWT_SECRET: string;
  };
};

export default createYoga({
  schema: await initServer(),
  graphqlEndpoint: "/api/graphql",
  plugins: [
    useJWT({
      issuer: "app.watermonster.io",
      signingKey: process.env.NEXT_PUBLIC_JWT_SECRET,
    }),
  ],
});
