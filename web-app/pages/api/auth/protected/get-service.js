import verifyToken from "../../middleware/verify-token";
import { prisma } from '@/utils/prismaClient';

async function getService(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;
    const serviceId = parseInt(id, 10);
    try {
      const service = await prisma.hotelService.findUnique({
        where: {
          id: serviceId,
        },
      });
      res.status(200).json({ service: service });
    }
    catch (e) {
      console.log(e);
      res.status(500).json({ error: "get guest info failed" });
    }
  }
};

export default function handler(req, res) {
  verifyToken(req, res, () => getService(req, res));
}