import { prisma } from '@/utils/prismaClient';
import { v4 as uuidv4 } from 'uuid';
import sendEmail from '@/utils/sendEmail';

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, checkin_date, room_number } = req.body;

    console.log(req.body);
    console.log(req.body['email']);
    console.log(req.body['room_number']);

    try {
      // await sendEmail("teddio496@gmail.com", "This is the second teest", "google.com")
      
      const guest = await prisma.hotelGuest.findFirst({
        where: {
          room_number,
          checkin_date,
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
          loginToken: token,
          tokenExpiresAt: tokenExpiresAt,
        },
      });
      const loginUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/user-login?token=${token}`;

      console.log("I am about to send the email out")
      await sendEmail(email, 'Login to your account', loginUrl);

      res.status(200).json({ message: 'Login link sent to your email' });
    }
    catch (e) {
      console.log(e);
      res.status(500).json({ error: "something failed with creating login" });
    }
  }
}
