import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { GraphQLError } from "graphql";

const check_auth = (context: any) => {
  const authHeader = context.req.headers.authorization;
  const jwtsecreat = process.env.SECRET_KEY || "default_secret_key";

  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, jwtsecreat);
        return user;
      } catch (error) {
        throw new GraphQLError("Invalid/Expired Token");
      }
    }
    throw new GraphQLError("Authencation Token must Be 'Bearer [Token] ");
  }

  throw new GraphQLError("Authorization Header must Be Provided ");
};


export { check_auth };
