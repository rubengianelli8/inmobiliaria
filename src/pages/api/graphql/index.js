import { ApolloServer } from "apollo-server-micro";

import { resolvers } from "@/graphql/resolvers";
import { schemas } from "@/graphql/schemas";

const apolloServer = new ApolloServer({
  cors: { origin: "*", credentials: true },
  typeDefs: schemas,
  resolvers: resolvers,

  // context: async ({ req }) => {
  //   if (req.headers.authorization !== process.env.SECRET_KEY)
  //     throw new Error("Acceso no permitido.");
  // },
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
  {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://studio.apollographql.com"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, PATCH, DELETE, OPTIONS, HEAD"
    );
    if (req.method === "OPTIONS") {
      res.end();
      return false;
    }
    await startServer;

    await apolloServer.createHandler({
      path: "/api/graphql",
    })(req, res);
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
