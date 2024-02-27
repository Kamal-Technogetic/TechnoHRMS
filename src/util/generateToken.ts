import jwt from "jsonwebtoken";

interface JwtUserType {
  id: String;
  email: String;
  username: String;
  jobTitle: String;
}

export function generateToken(user: JwtUserType): string {
  const jwtsecreat = process.env.SECRET_KEY || "default_secret_key";
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      employJobTitle: user.jobTitle,
    },
    jwtsecreat,
    { expiresIn: "10h" }
  );

  return token;
}
