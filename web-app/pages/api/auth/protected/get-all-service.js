import { prisma } from '@/utils/prismaClient';

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const service = await prisma.hotelService.findMany();
      res.status(200).json({ service: service });
    }
    catch (e) {
      console.log(e);
      res.status(500).json({ error: "get all service failed" });
    }
  }
};