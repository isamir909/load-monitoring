import type { Machine } from "../models/Machime";
import { MongoClient, Collection } from "mongodb";


const url = process.env.DB_CONNECTION_STRING || "";
const dbName = process.env.DB_NAME || '';

async function createMachine(machineData: Machine) {

    const client = new MongoClient(url);

    try {
        // Connect to MongoDB
        await client.connect();

        const db = client.db(dbName);
        const collection: Collection<Machine> = db.collection<Machine>("machines");

        // Check if a record with the given MAC address already exists
        const existingMachine = await collection.findOne({ macAddress: machineData.macAddress });

        if (!existingMachine) {
            // If no record found, insert the new machine record
            await collection.insertOne(machineData);
            console.log("New machine record created.");
        } else {
            console.log("Machine record already exists.");
        }
    } catch (error) {
        console.error("Error occurred while checking/creating machine record:", error);
    } finally {
        // Close the connection
        await client.close();
    }
}
export default createMachine