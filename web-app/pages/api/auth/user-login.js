import { prisma } from '@/utils/prismaClient';
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  console.log(req.query);
  const { token } = req.body;

  const guest = await prisma.hotelGuest.findFirst({
    where: {
      loginToken: token,
      tokenExpiresAt: { gte: new Date() }, 
    },
  });

  if (!guest) { return res.status(400).json({ message: 'Invalid or expired token' }); }

  const accessToken = jwt.sign(
    { 
        roomNumber: guest.room_number, 
        checkinDate: guest.checkin_date 
    },
    ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' } 
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
      login_token: null, 
    },
  });
  

  return res.status(200).json({
    accessToken,
    refreshToken,
    guest: {
      id: guest.id,
      fullname: guest.fullname,
      roomNumber: guest.roomNumber,
    },
  });
  */


  res.setHeader('Set-Cookie', [
    `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=900`, // 15 minutes
    `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=${14 * 24 * 60 * 60}` // 14 days
  ]);


  res.writeHead(302, {
    Location: `/dashboard`,
  });
  res.end();
}
