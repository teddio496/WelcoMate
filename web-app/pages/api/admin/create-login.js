import { prisma } from '@/prisma';
import { v4 as uuidv4 } from 'uuid';
import { sendEmail } from '@/utils/sendEmail';

export default async function handler(req, res) {
  const { email, checkin_date, room_number } = req.body;

  const guest = await prisma.hotelGuest.findFirst({
    where: {
      email,
      room_number,
      checkin_date: new Date(checkin_date),
    },
  });

  if (!guest) {
    return res.status(404).json({ message: 'Guest not found' });
  }

  const token = uuidv4();
  const tokenExpiresAt = new Date(Date.now() + 60 * 60 * 12000); 

  await prisma.hotelGuest.update({
    where: { id: guest.id },
    data: {
      login_token: token,
      token_expires_at: tokenExpiresAt,
    },
  });

  const loginUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/user-login?token=${token}`;
  await sendEmail(email, 'Login to your account', `Click here to login: ${loginUrl}`);

  res.status(200).json({ message: 'Login link sent to your email' });
}
