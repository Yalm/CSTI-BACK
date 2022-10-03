import { MongoClient, Db, MongoClientOptions } from "mongodb";
import configuration from "../config/configuration";

let cachedDb: Db = null;

export function connectToClient() {
  return MongoClient.connect(configuration.database.url, {
    useUnifiedTopology: true,
  } as MongoClientOptions);
}

export async function connectToDatabase() {
  if (cachedDb) {
    console.log("=> using cached database instance");
    return { db: cachedDb };
  }
  const client = await connectToClient();
  const db = client.db(configuration.database.name);
  cachedDb = db;
  return { db, client };
}
