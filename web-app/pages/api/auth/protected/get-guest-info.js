import verifyToken from "../../middleware/verify-token";
import { prisma } from '@/utils/prismaClient';

async function getGuestInfo(req, res) {
  if (req.method === "GET") {
    const { roomNumber, checkinDate } = req.user; 
    console.log(req.user);
    console.log("Room Number: ", roomNumber);
    console.log("Check-in Date: ", checkinDate);
    try {
      const guest = await prisma.HotelGuest.findMany({
        where: {
          roomNumber,
          checkinDate,
        }
      });
      console.log(guest[0]);
      res.status(200).json({ guestInfo: guest[0] }); 
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