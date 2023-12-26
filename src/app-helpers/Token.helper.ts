import jwt from "jsonwebtoken";

interface Payload {
  userId: string;
}

export const TokenHelper = () => {
  return {
    sign(payload: Payload, jwtSecret: string) {
      return jwt.sign(payload, jwtSecret);
    },
    verify(token: string, jwtSecret: string) {
      return jwt.verify(token, jwtSecret) as Payload;
    },
  };
};

export function parseJwt(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  global.atob = require("atob");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
