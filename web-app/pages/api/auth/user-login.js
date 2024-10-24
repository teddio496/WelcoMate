import { prisma } from '@/utils/prismaClient';
import * as jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export default async function handler(req, res) {
  const { token } = req.body;

  const guest = await prisma.hotelGuest.findFirst({
    where: {
      login_token: token,
      token_expires_at: { gte: new Date() }, 
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


  await prisma.hotelGuest.update({
    where: { id: guest.id },
    data: {
      login_token: null, 
    },
  });

  res.status(200).json({
    accessToken,
    refreshToken,
    guest: {
      id: guest.id,
      fullname: guest.fullname,
      room_number: guest.room_number,
    },
  });
}
