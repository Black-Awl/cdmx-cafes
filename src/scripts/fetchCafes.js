import dotenv from 'dotenv';
import Airtable from 'airtable';
import fs from 'fs/promises';
import path from 'path';

dotenv.config();

const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(process.env.AIRTABLE_BASE_ID);
const tableId = process.env.AIRTABLE_TABLE_ID;

async function fetchCafes() {
  const cafes = [];
  try {
    await base(tableId).select().eachPage((records, fetchNextPage) => {
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
    const jsonContent = JSON.stringify(cafes.length > 0 ? cafes : [], null, 2);
    await fs.writeFile(
      path.join(process.cwd(), 'src', 'data', 'cafes.json'),
      jsonContent
    );
    console.log(`Cached ${cafes.length} cafes`);
    console.log('JSON content:', jsonContent);
  } catch (error) {
    console.error('Failed to fetch and cache cafes:', error);
    // Create an empty array if fetching fails
    await fs.writeFile(
      path.join(process.cwd(), 'src', 'data', 'cafes.json'),
      '[]'
    );
    console.log('Created an empty cafes.json file');
  }
}

main();
