import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET: string | undefined = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET: string | undefined =
  process.env.REFRESH_TOKEN_SECRET;

function generateToken(data: any) {
  const token: string = jwt.sign(
    data,
    ACCESS_TOKEN_SECRET || "ACCESS_TOKEN_SECRET",
    {
      expiresIn: "10m",
    }
  );

  const refreshToken: string = jwt.sign(
    data,
    REFRESH_TOKEN_SECRET || "REFRESH_TOKEN_SECRET",
    {
      expiresIn: "30m",
    }
  );
  return { token, refreshToken };
}

export { generateToken };
