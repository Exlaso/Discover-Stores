const Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_TOKEN,
});
const base = Airtable.base(process.env.AIRTABLE_BASE_KEY);

export const table = base("Coffee Stores");

const MinifyRecord = (Record) => {
  return { 
    recordId: Record.id,
    ...Record.fields };
};
export const MinifyRecords = (Records) => {
  return Records.map((record) => MinifyRecord(record));
};

export const FindRecordByFilter = async (id) => {
   const findCoffeeStoreRecords = await table
    .select({ filterByFormula: `id="${id}"` })
    .firstPage();

  return (MinifyRecords(findCoffeeStoreRecords));
};
