import { IGym } from '@/db/interfaces/IGym';
import { Schema, model, models } from 'mongoose';

const gymSchema = new Schema<IGym>({
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
},
{
  timestamps: true,
});

const GymModel = models.Gym || model<IGym>('Gym', gymSchema);

export default GymModel;