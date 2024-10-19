import Airtable from 'airtable';

const token = process.env.AIRTABLE_TOKEN;
const baseId = process.env.AIRTABLE_BASE_ID;
const tableId = process.env.AIRTABLE_TABLE_ID;

if (!token || !baseId || !tableId) {
  console.error('Airtable token, Base ID, or Table ID is missing');
}

const base = new Airtable({ apiKey: token }).base(baseId);

export async function fetchCafes() {
  console.log('Fetching cafes...');
  console.log('Base ID:', baseId);
  console.log('Table ID:', tableId);
  console.log('API Key (first 5 chars):', token.substring(0, 5));

  try {
    const records = await base(tableId).select().all();
    const cafes = records.map(record => ({
      id: record.id,
      name: record.get('Name'),
      address: record.get('Address'),
      latitude: record.get('Latitude'),
      longitude: record.get('Longitude'),
    }));
    console.log(`Successfully fetched ${cafes.length} cafes`);
    return cafes;
  } catch (error) {
    console.error('Error fetching cafes:', error);
    if (error.statusCode === 403) {
      console.error('Authorization error. Check your API key and permissions.');
    }
    throw error;
  }
}
