import verifyToken from "../../middleware/verify-token";
import { prisma } from '@/utils/prismaClient';

async function cancelBooking(req, res) {
    if (req.method === "DELETE") {
        const { bookingId } = req.body;
        console.log("Booking ID: ", bookingId);
        try {
            // Find the booking by ID to ensure it exists
            const booking = await prisma.hotelServiceBooking.findMany({
                where: {
                    id: bookingId,
                },
            });

            if (!booking) {
                return res.status(404).json({ error: "Booking not found" });
            }

            // Delete the booking
            await prisma.hotelServiceBooking.deleteMany({
                where: {
                    id: bookingId,
                },
            });

            res.status(200).json({ message: "Booking canceled successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to cancel booking" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}

export default function handler(req, res) {
    verifyToken(req, res, () => cancelBooking(req, res));
}
