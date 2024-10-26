import verifyToken from "../../middleware/verify-token";
import { prisma } from '@/utils/prismaClient';

async function createBooking(req, res) {
  if (req.method === "POST") {
    const { roomNumber, checkinDate } = req.user; // req.user is the payload
    const { serviceId, hotelId } = req.body;
    console.log(serviceId, hotelId);
    try {
      const guest = await prisma.hotelGuest.findMany({
        where: {
          roomNumber: roomNumber,
          checkinDate: checkinDate,
        }
      });

      if (!guest) {
        return res.status(404).json({ error: "Guest not found" });
      }

      const newBooking = await prisma.hotelServiceBooking.create({
        data: {
          serviceId,
          guestId: guest[0].id,
          hotelId,
        }
      });
      
      res.status(201).json({ newBooking });
    }
    catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to create new booking" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default function handler(req, res) {
  verifyToken(req, res, () => createBooking(req, res));
}
