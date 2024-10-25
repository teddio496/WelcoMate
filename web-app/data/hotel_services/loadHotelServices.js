import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import csv from 'csv-parser';

const prisma = new PrismaClient();

export default async function loadHotelServices(filePath) {
    const services = [];

    // Read CSV and parse rows
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {

            services.push({
                hotelId: Number(row.hotelId),
                name: row.name,
                descriptions: row.descriptions,
                imageLinks: row.imageLink,
                freeService: row.freeService.toLowerCase() === 'true',
            });

            console.log(services);
        })
        .on('end', async () => {
            for (const service of services) {

                // Create attraction and connect or create associated tags
                await prisma.HotelService.create({
                    data: {
                        hotelId: service.hotelId,
                        name: service.name,
                        descriptions: service.descriptions,
                        imageLinks: service.imageLinks,
                        freeService: service.freeService,
                    }
                });
            }

            console.log('Data successfully loaded!');
        })
        .on('error', (error) => {
            console.error('Error reading CSV file:', error);
        });
}