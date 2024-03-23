import UserModel from "@/db/models/UserModel";
import { DatabaseUser } from "@/lib/auth";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";

class UserService {
  async getAllUsers(): Promise<DatabaseUser[]> {
    const users = await UserModel.find({}, { password: 0 });

    return users;
  }

  async getAllUsersButAdmins(): Promise<DatabaseUser[]> {
    const allUsers = await UserModel.find(
      { role: { $nin: "administrator" } },
      { password: 0 }
    );

    return allUsers;
  }

  async getUserById(userId: string): Promise<DatabaseUser | null> {
    const user = await UserModel.findOne(
      {
        _id: userId,
      },
      { password: 0 }
    );

    return user;
  }

  async getLoginUserByEmail(email: string): Promise<DatabaseUser | null> {
    const user = await UserModel.findOne({
      email: email,
    });

    return user;
  }

  async getUserByEmail(email: string): Promise<DatabaseUser | null> {
    const user = await UserModel.findOne(
      {
        email: email,
      },
      { password: 0 }
    );

    return user;
  }

  async createUser(userData: DatabaseUser): Promise<any> {
    const {
      email,
      dni,
      fullname,
      user_type,
      gender,
      gym_id,
      target_metric,
      target_value,
    } = userData;

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
        gender,
        user_type,
        gym_id,
        targets: [
          {
            target_metric,
            target_value,
          },
        ],
        role: "user",
      };

      const newUser = await UserModel.create(newData);

      return newUser;
    } catch (error) {
      console.error("Error creating user", error);
    }
  }

  async editUser(userData: DatabaseUser, userId: string): Promise<any> {
    try {
      const user = await UserModel.findOneAndUpdate({ _id: userId }, userData, {
        new: true,
      });
      return user;
    } catch (error) {
      console.error("Error editing user", error);
    }
  }

  async deleteUser(userId: string): Promise<any> {
    try {
      const user = await UserModel.findOneAndDelete({ _id: userId });

      return user;
    } catch (error) {
      console.error("Error deleting user", error);
    }
  }
}

export default UserService;
