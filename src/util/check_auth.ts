import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const check_auth = (context: any) => {
  console.log("value of Context", context);
};

export { check_auth };
