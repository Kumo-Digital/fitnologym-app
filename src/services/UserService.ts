import UserModel from "@/db/models/UserModel";
import { IUser } from "@/types/interfaces/IUser";
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";

class UserService {
  async getAllUsers(): Promise<IUser[]> {
    const users = await UserModel.find();

    return users;
  }

  async getUserByUid(userId: string): Promise<IUser | null> {
    const user = await UserModel.findOne({
      uid: userId,
    });

    return user;
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    const user = await UserModel.findOne({
      email: email,
    });

    return user;
  }

  async createUser(userData: IUser): Promise<NextResponse> {
    const { email, dni, fullname } = userData;

    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(dni, Number(process.env.BCRYPT_SALT_ROUNDS));
      
      const newData = {
        fullname,
        dni,
        email,
        password: hashedPassword,
        gym_id: "1",
        role: "user",
        uid: 1234567890,
        user_type: "basic",
      }

      const newUser = await UserModel.create(newData);
      console.log(newUser);

      return NextResponse.json({
        message: 'Usuario registrado',
        success: true,
      }, {status: 200});

    } catch (error) {
      return NextResponse.json({
        message: error,
        success: false,
      }, {status: 400});
    }
  }
}

export default UserService;