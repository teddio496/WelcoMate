import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import csv from 'csv-parser';

const prisma = new PrismaClient();

export default async function loadAttractions(filePath) {
    const attractions = [];

    // Read CSV and parse rows
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {

            const tags = row.tags.split(',').map(tag => ({ name: tag.trim() }));

            attractions.push({
                title: row.title,
                address: row.address,
                description: row.description,
                link_url: row.link_url,
                latitude: parseFloat(row.latitude),
                longitude: parseFloat(row.longitude),
                indoor_outdoor: row.indoor_outdoor,
                imageLink: row.imageLink,
                tags: tags
            });

            console.log(attractions);
        })
        .on('end', async () => {
            for (const attraction of attractions) {

                // Create attraction and connect or create associated tags
                await prisma.attraction.create({
                    data: {
                        title: attraction.title,
                        address: attraction.address,
                        description: attraction.description,
                        link_url: attraction.link_url,
                        latitude: attraction.latitude,
                        longitude: attraction.longitude,
                        indoor_outdoor: attraction.indoor_outdoor,
                        imageLink: attraction.imageLink,
                        tags: {
                            connectOrCreate: attraction.tags.map(tag => ({
                                where: { name: tag.name },
                                create: { name: tag.name }
                            }))
                        }
                    }
                });
            }

            console.log('Data successfully loaded!');
        })
        .on('error', (error) => {
            console.error('Error reading CSV file:', error);
        });
}