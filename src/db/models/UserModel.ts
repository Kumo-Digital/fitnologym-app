import { UserType } from '@/types/UserType';
import { Schema, model, Document } from 'mongoose';

// Define the interface for the User document
export interface User extends Document {
  uid: number;
  fullname: string;
  dni: string;
  email: string;
  password: string;
  gym_id: number;
  role: string;
  user_type: UserType;
}

// Define the Mongoose schema for the User model
const userSchema = new Schema<User>({
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

const UserModel = model<User>('User', userSchema);

export default UserModel;