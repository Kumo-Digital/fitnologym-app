import { Document } from "mongoose";

export interface IGym extends Document {
    id: string;
    name: string;
    address: string;
    city: string;
    image_url?: string;
}