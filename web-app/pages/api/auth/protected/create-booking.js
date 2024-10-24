import verifyToken from "../middleware/verify-token";
import { prisma } from '@/utils/prismaClient';

function createBooking(req, res) {
  if (req.method === "POST") {
    const { roomNumber, checkinDate } = req.user;
    const { serviceName, hotelId } = req.body;
    try {
      const guest = prisma.hotelGuest.findUnique({
        where: {
          room_number: roomNumber,
          checkin_date: checkinDate,
        }
      });
      const newBooking = prisma.hotelServiceBookings.create({
        data: {
          service_name: serviceName,
          guest_id: guest.id,
          hotel_id: hotelId,
        }
      });
      res.status(201).json({ newBooking: newBooking });
    }
    catch (e) {
      console.log(e);
      res.status(500).json({ error: "create new booking failed" });
    }
  }
};

export default function handler(req, res) {
  verifyToken(req, res, () => createBooking(req, res));
}