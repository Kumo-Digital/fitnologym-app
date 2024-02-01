import { Schema, model, Document } from 'mongoose';

export interface Gym extends Document {
  id: string;
  name: string;
  address: string;
  city: string;
  image_url?: string;
}

const gymSchema = new Schema<Gym>({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  image_url: {
    type: String,
    required: false
  },
});

const GymModel = model<Gym>('Gym', gymSchema);

export default GymModel;