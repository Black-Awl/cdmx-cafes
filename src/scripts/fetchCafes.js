import dotenv from 'dotenv';
import Airtable from 'airtable';
import fs from 'fs/promises';
import path from 'path';

dotenv.config();

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

async function fetchCafes() {
  const cafes = [];
  try {
    await base('Cafes').select().eachPage((records, fetchNextPage) => {
      records.forEach((record) => {
        cafes.push({
          id: record.id,
          name: record.get('Name'),
          address: record.get('Address'),
          latitude: record.get('Latitude'),
          longitude: record.get('Longitude'),
          // Add other fields as needed
        });
      });
      fetchNextPage();
    });
  } catch (error) {
    console.error('Error fetching data from Airtable:', error.message);
    if (error.statusCode) {
      console.error('Status Code:', error.statusCode);
    }
    if (error.error) {
      console.error('Error Type:', error.error);
    }
    throw error;  // Re-throw the error to stop the build process
  }
  return cafes;
}

async function main() {
  try {
    const cafes = await fetchCafes();
    await fs.writeFile(
      path.join(process.cwd(), 'src', 'data', 'cafes.json'),
      JSON.stringify(cafes, null, 2)
    );
    console.log(`Cached ${cafes.length} cafes`);
  } catch (error) {
    console.error('Failed to fetch and cache cafes:', error);
    process.exit(1);  // Exit with an error code to stop the build process
  }
}

main();
