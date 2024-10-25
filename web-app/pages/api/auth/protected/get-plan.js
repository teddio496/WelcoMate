import verifyToken from "../middleware/verify-token";
import { prisma } from '@/utils/prismaClient';

function getGuestInfo(req, res) {
  if (req.method === "GET") {
    const { roomNumber, checkinDate } = req.user; // req.user is the payload
    const { planId } = req.body;
    try {
      const guest = prisma.hotelGuest.findUnique({
        where: {
          room_number: roomNumber,
          checkin_date: checkinDate,
        }
      });
      if (guest) {
        const plan = prisma.plan.findUnique({
          where: {
            planId: planId,
          }
        });
        res.status(200).json({ plan: plan });
      }
      res.status(404).json({ message: "guest not found" });
    }
    catch (e) {
      console.log(e);
      res.status(500).json({ error: "get guest's plan failed" });
    }
  }
};

export default function handler(req, res) {
  verifyToken(req, res, () => getGuestInfo(req, res));
}