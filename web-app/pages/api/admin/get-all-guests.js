import verifyToken from "../middleware/verify-token";
import { prisma } from '@/utils/prismaClient';

async function getAllGuests(req, res) {
  console.log("GET ALL GUESTS RUNNING");
  if (req.method === "GET") {
    const { username, hotelId } = req.user;
    console.log(req.user + ", username: " + username);
    try {
      const admin = await prisma.admin.findUnique({
        where: {
          hotelId_username: {
            hotelId: hotelId,
            username: username,
          },
        },
      });
      if (!admin) {
        res.status(403).json({ error: "you are not the admin not allowed to find all guests" });
      }

      const guests = await prisma.hotelGuest.findMany({
        where: {
          hotelId: hotelId, // only grab guests staying at the admin's hotel 
        },
        include: {
          plansList: true,
          serviceBookings: true,
        }
      });
      // console.log("FIRST GUEST: ", guests[0]);
      res.status(200).json({ allGuests: guests });
    }
    catch (e) {
      console.log(e);
      res.status(500).json({ error: "get all guests failed" });
    }
  }
};

export default function handler(req, res) {
  verifyToken(req, res, () => getAllGuests(req, res));
}