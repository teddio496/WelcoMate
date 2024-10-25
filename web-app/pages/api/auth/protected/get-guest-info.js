import verifyToken from "../../middleware/verify-token";
import { prisma } from '@/utils/prismaClient';

function getGuestInfo(req, res) {
  if (req.method === "GET") {
    const { roomNumber, checkinDate } = req.user; 
    console.log(req.user);
    try {
      const guest = prisma.hotelGuest.findUnique({
        where: {
          roomNumber: roomNumber,
          checkinDate: checkinDate,
        }
      });
      res.status(201).json({ guestInfo: guest }); 
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