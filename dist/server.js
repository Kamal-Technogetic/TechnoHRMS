"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const index_1 = require("./graphQL/resolvers/index");
const typeDefs_1 = require("./graphQL/schema/typeDefs");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const server = new server_1.ApolloServer({
            typeDefs: typeDefs_1.typeDefs,
            resolvers: index_1.resolvers,
        });
        yield mongoose_1.default.connect(process.env.MONGODB);
        console.log(`🚀🚀 MongoDB Connected 🚀🚀`);
        const { url } = yield (0, standalone_1.startStandaloneServer)(server, {
            context: ({ req, res }) => __awaiter(void 0, void 0, void 0, function* () { return ({ req, res }); }),
            listen: { port: 4040 },
        });
        console.log(`🚀🚀  Server ready at: ${url} 🚀🚀`);
    }
    catch (error) {
        console.error("Error On Server Starting: ", error);
        console.log("Error On Server Starting: ", error);
    }
});
startServer();
