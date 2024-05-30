// schema.ts
import { ObjectId } from "mongodb";

// Define interface for your document
export interface Machine {
    _id?: ObjectId;
    macAddress: string;
    cpuLoad: number;
    freeMemory: number;
    totalMemory: number;
    usedMemory: number;
    memoryUsage: number;
    osType: string;
    upTime: number;
    cpuModel: string;
    numsOfCores: number;
    cpuSpeed: number;   
}
