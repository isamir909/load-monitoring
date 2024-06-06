import type { ActivityLog } from "../../models/Logs";
import { MongoClient, Collection } from "mongodb";


const url = process.env.DB_CONNECTION_STRING || "";
const dbName = process.env.DB_NAME || '';

async function createActivityLog(data: ActivityLog) {

    const client = new MongoClient(url);

    try {
        // Connect to MongoDB
        await client.connect();

        const db = client.db(dbName);
        const collection: Collection<ActivityLog> = db.collection<ActivityLog>("activitylog");

        // Check if a record with the given MAC address already exists
        const existingMachine = await collection.insertOne(data);

      return true
    } catch (error) {
        console.error("Error occurred while checking/creating machine record:", error);
    } finally {
        // Close the connection
        await client.close();
    }
}
export default createActivityLog