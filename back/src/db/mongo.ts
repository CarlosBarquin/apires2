import { MongoClient, Database } from "mongo";

import { SlotSchema } from "./schemas.ts";


const client = new MongoClient();
await client.connect(`mongodb://mongo:27017`);

const db = client.database("MyDatabase");
console.info(`MongoDB ${db.name} connected`);

export const slotCollection = db.collection<SlotSchema>("slots")



