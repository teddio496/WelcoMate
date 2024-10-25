import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import csv from 'csv-parser';

const prisma = new PrismaClient();

export default async function loadRestaurants(filePath) {
    const restaurants = [];

    // Read CSV and parse rows
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {

            const tags = row.tags.split(',').map(tag => ({ name: tag.trim() }));

            restaurants.push({
                title: row.title,
                address: row.address,
                description: row.description,
                imageLink: row.imageLink,
                tags: tags
            });

            console.log(restaurants);
        })
        .on('end', async () => {
            for (const restaurant of restaurants) {

                // Create restaurant and connect or create associated tags
                await prisma.Restaurant.create({
                    data: {
                        title: restaurant.title,
                        address: restaurant.address,
                        description: restaurant.description,
                        imageLink: restaurant.imageLink,
                        tags: {
                            connectOrCreate: restaurant.tags.map(tag => ({
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