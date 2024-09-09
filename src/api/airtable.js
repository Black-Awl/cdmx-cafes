import Airtable from 'airtable';

const apiKey = import.meta.env.AIRTABLE_API_KEY;
const baseId = import.meta.env.AIRTABLE_BASE_ID;

if (!apiKey || !baseId) {
  console.error('Airtable API key or Base ID is missing');
}

const base = new Airtable({ apiKey }).base(baseId);

export async function fetchCafes() {
  console.log('Fetching cafes...');
  console.log('Base ID:', baseId);
  console.log('API Key (first 5 chars):', apiKey.substring(0, 5));

  return new Promise((resolve, reject) => {
    const cafes = [];
    base('Cafes').select({
      // maxRecords: 3,
      view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record) {
        cafes.push({
          id: record.id,
          name: record.get('Name'),
          address: record.get('Address'),
          latitude: record.get('Latitude'),
          longitude: record.get('Longitude'),
        });
      });

      fetchNextPage();
    }, function done(err) {
      if (err) {
        console.error('Error fetching cafes:', err);
        reject(err);
      } else {
        console.log(`Successfully fetched ${cafes.length} cafes`);
        resolve(cafes);
      }
    });
  });
}
