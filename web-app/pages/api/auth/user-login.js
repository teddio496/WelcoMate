import { prisma } from '@/utils/prismaClient';
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export default async function handler(req, res) {
  console.log("USER-LOGIN RUNNING");
  if (req.method !== 'GET') {
    console.log("must use GET method");
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const { token } = req.query;

  const guest = await prisma.hotelGuest.findFirst({
    where: {
      loginToken: token,
      tokenExpiresAt: { gte: new Date() },
    },
  });
  if (!guest) { return res.status(400).json({ message: 'Invalid or expired token' }); }

  const accessToken = jwt.sign(
    {
      roomNumber: guest.roomNumber,
      checkinDate: guest.checkinDate
    },
    ACCESS_TOKEN_SECRET,
    { expiresIn: '1d' }
  );
  const refreshToken = jwt.sign(
    { guestId: guest.id },
    REFRESH_TOKEN_SECRET,
    { expiresIn: '14d' }
  );

  /*
  await prisma.hotelGuest.update({
    where: { id: guest.id },
    data: {
      loginToken: null, 
    },
  });
  */
  res.setHeader('Set-Cookie', [
    `accessToken=${accessToken}; Path=/; Max-Age=604800`,
    `refreshToken=${refreshToken}; Path=/; Max-Age=604800` 
  ]);
  res.redirect("/", 302);
}
