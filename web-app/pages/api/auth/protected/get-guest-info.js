import verifyToken from "../middleware/verify-token";
import { prisma } from '@/utils/prismaClient';

function getGuestInfo(req, res) {
  if (req.method === "GET") {
    const { roomNumber, checkinDate } = req.user; // req.user is the payload
    try {
      const guest = prisma.hotelGuest.findUnique({
        where: {
          room_number: roomNumber,
          checkin_date: checkinDate,
        }
      });
      res.status(201).json({ guestInfo: guest }); // gives guest's service bookings and plan id
    }
    catch (e) {
      console.log(e);
      res.status(500).json({ error: "get guest info failed" });
    }
  }
};

export default function handler(req, res) {
  verifyToken(req, res, () => getGuestInfo(req, res));
}