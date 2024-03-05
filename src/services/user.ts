import UserModel from "@/db/models/UserModel";
import { DatabaseUser } from "@/lib/auth";
import { IUser } from "@/db/interfaces/IUser";
// import bcrypt from 'bcrypt';
import { generateId } from "lucia";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { Argon2id } from "oslo/password";

class UserService {
  async getAllUsers(): Promise<DatabaseUser[]> {
    const users = await UserModel.find();

    return users;
  }

  async getUserById(userId: string): Promise<DatabaseUser | null> {
    const user = await UserModel.findOne({
      _id: userId,
    });

    return user;
  }

  async getUserByEmail(email: string): Promise<DatabaseUser | null> {
    const user = await UserModel.findOne({
      email: email,
    });

    return user;
  }

  async createUser(userData: DatabaseUser): Promise<NextResponse> {
    const { email, dni, fullname } = userData;

    try {
      // Hash password
      const hashedPassword = await new Argon2id().hash(dni);
      // const hashedPassword = await bcrypt.hash(dni, Number(process.env.BCRYPT_SALT_ROUNDS));
      const userId = generateId(15);

      const newData = {
        _id: userId,
        fullname,
        dni,
        email,
        password: hashedPassword,
        user_type: "basic",
        role: "user",
      };

      const newUser = await UserModel.create(newData);
      console.log(newUser);

      return NextResponse.json(
        {
          message: "Usuario registrado",
          success: true,
        },
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        {
          message: error,
          success: false,
        },
        { status: 400 }
      );
    }
  }

  async getAllUsersButAdmins(): Promise<DatabaseUser[]> {
    const allUsers = await UserModel.find({ role: { $nin: "administrator" } });

    return allUsers;
  }
}

export default UserService;
