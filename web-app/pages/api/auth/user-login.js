import { prisma } from '@/utils/prismaClient';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  console.log("USER-LOGIN RUNNING");
  if (req.method !== 'GET') {
    // must be GET because we accessing through a link
    console.log("must use GET method");
    return res.status(405).json({ message: 'Method not allowed' });
  }
  try {
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
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1d' }
    );
    const refreshToken = jwt.sign(
      { guestId: guest.id },
      process.env.REFRESH_TOKEN_SECRET,
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
  catch (e) {
    console.log(e);
    res.status(500).json({ error: "something went wrong with user-login" });
  }
}
