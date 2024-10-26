import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {

    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }

    try {
        const hotelGuest = await prisma.hotelGuest.findUnique({
            where: { id: parseInt(id) },
            include: { plansList: true }
        });

        if (!hotelGuest) {
            return res.status(404).json({ message: 'Hotel guest not found' });
        }

        const planId = Math.max(...hotelGuest.plansList.map(plan => plan.id));
        console.log("PLANID: " + planId);

        return res.status(200).json({ planId });
    }
    catch (error) {
        console.error('Error fetching plan:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }

}