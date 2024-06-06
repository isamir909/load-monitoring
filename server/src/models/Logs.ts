// schema.ts
import { ObjectId } from "mongodb";

type ActivityType = "connected" | "disconnected";

// Define interface for your document
export interface ActivityLog {
    _id?: ObjectId;
    macAddress: string;
    connectedOn: Date | null;
    disconnectedOn: Date | null;
    type: ActivityType;
}
