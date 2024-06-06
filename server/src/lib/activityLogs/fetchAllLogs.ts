import type { ActivityLog } from "../../models/Logs";
import { MongoClient, Collection } from "mongodb";


const url = process.env.DB_CONNECTION_STRING || "";
const dbName = process.env.DB_NAME || '';

interface filters {
macAddress?: string
}


async function fetchAllLogs(data: filters) {

    const client = new MongoClient(url);

    try {
        // Connect to MongoDB
        await client.connect();

        const db = client.db(dbName);
        const collection: Collection<ActivityLog> = db.collection<ActivityLog>("activitylog");

        // Check if a record with the given MAC address already exists
        const logs = await collection.find(data).toArray();
console.log(logs, "logs");

      return logs
    } catch (error) {
        console.error("Error occurred while checking/creating machine record:", error);
        return []
    } finally {
        // Close the connection
        await client.close();
    }
}
export default fetchAllLogs





