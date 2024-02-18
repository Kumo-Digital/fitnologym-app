import { IUser } from '@/types/interfaces/IUser';
import { Schema, model, models } from 'mongoose';

// Define the Mongoose schema for the User model
const userSchema = new Schema<IUser>({
  uid: {
    type: Number,
    required: true
  },
  fullname: {
    type: String,
    required: true
  },
  dni: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  gym_id: {
    type: Number,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  user_type: {
    type: String,
    required: true
  }
},
{
  timestamps: true,
});

const UserModel = models.User || model<IUser>('User', userSchema);

export default UserModel;