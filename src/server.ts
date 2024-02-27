import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./graphQL/resolvers/index";
import { typeDefs } from "./graphQL/schema/typeDefs";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const startServer = async () => {
  try {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    await mongoose.connect(process.env.MONGODB!);
    console.log(`🚀🚀 MongoDB Connected 🚀🚀`);

    const { url } = await startStandaloneServer(server, {
      context: async ({ req, res }) => ({ req, res }),
      listen: { port: 4040 },
    });

    console.log(`🚀🚀  Server ready at: ${url} 🚀🚀`);
  } catch (error) {
    console.error("Error On Server Starting: ", error);
    console.log("Error On Server Starting: ", error);
  }
};
startServer();
