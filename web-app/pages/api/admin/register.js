import { prisma } from '@/utils/prismaClient';
import * as bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { username, password, hotelId } = await req.json();
  console.log(username, password);
  const saltRounds = 10;
  try {
    const hashedPass = await bcrypt.hash(password, saltRounds);
    const admin = await prisma.admin.create({
      data: {
        username: username,
        password: hashedPass,
        hotelId: hotelId,
      },
    });
    return res.json({ admin: admin });
  }
  catch (e) {
    console.error(e);
    return res.json({ error: "failed to create admin" });
  }
}
