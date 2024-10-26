import { prisma } from '@/utils/prismaClient';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  console.log("ADMIN-LOGIN RUNNING");
  const { username, password, hotelId } = req.body;
  console.log("HOTELID: " + hotelId);
  if (req.method === "POST") {
    try {
      const admin = await prisma.admin.findUnique({
        where: {
          hotelId_username: {
            hotelId: hotelId,
            username: username,
          },
        },
      });
      if (!admin) {
        return res.json({ error: "invalid username" });
      }
      // compare the passwords
      const isValidPass = password === admin.password ? true : false;
      if (!isValidPass) {
        return res.json({ error: "invalid password" });
      }
      // credentials are valid, generate a JWT
      const payload = {
        username: admin.username,
        hotelId: admin.hotelId,
        expiresAt: Math.floor(Date.now() / 1000) + (60 * 15),
      };
      const accessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "12h" }
      );
      const refreshToken = jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "12h" }
      );
      res.setHeader('Set-Cookie', [
        `adminAccessToken=${accessToken}; Path=/; Max-Age=604800`,
        `adminRrefreshToken=${refreshToken}; Path=/; Max-Age=604800`
      ]);
      res.status(200).json({ success: "admin logged in" });
    }
    catch (e) {
      console.error(e);
      return res.status(500).json({ error: "something went wrong with login" });
    }
  }
}
