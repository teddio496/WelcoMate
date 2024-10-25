import * as jwt from "jsonwebtoken";

export default async function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "authorization header missing" });
  }
  // console.log("Authorization header is there");
  const token = authHeader.split(' ')[1];
  // console.log("Token: ", token);
  try {
    // console.log(jwt.decode(token));
    req.user = jwt.decode(token);
    // console.log("User: ", req.user);
    next();
  }
  catch (e) {
    console.log(e);
    return res.status(401).json({ error: "invalid or expired token" });
  }
}