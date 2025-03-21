import UserModel from "@/db/models/UserModel";
import { DatabaseUser } from "@/lib/auth";
import { ChangePasswordForm, UserForm } from "@/types/user";
import { ROLES } from "@/utils/constants";
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

  async getUserByDNI(dni: string): Promise<DatabaseUser | null> {
    const user = await UserModel.findOne(
      {
        dni: dni,
      },
    );

    return user;
  }

  async createUser(userData: UserForm, role: string): Promise<any> {
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

      let userData;

      if (role === ROLES.USER) {
        userData = {
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
          role,
          last_logged_in: null,
        };
      } else {
        userData = {
          _id: userId,
          fullname,
          dni,
          email,
          password: hashedPassword,
          gender,
          user_type: undefined,
          gym_id: undefined,
          targets: undefined,
          role,
          last_logged_in: null,
        }
      }

      const newUser = await UserModel.create(userData);

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

  async changePassword(userId: string, passwordData: ChangePasswordForm): Promise<any> {
    try {
      const existingUser = await UserModel.findOne({
        _id: userId,
      });

      if (!existingUser) {
        console.error('There is no existing user!');
      }

      // Check if old password is valid
      const validPassword = await new Argon2id().verify(
        existingUser.password,
        passwordData.current_password,
      );

      if (!validPassword) {
        console.error('La contraseña actual no coincide');
      }

      // Hash new password
      const hashedNewPassword = await new Argon2id().hash(passwordData.new_password);

      const updateUser = await UserModel.findOneAndUpdate(
        {
          _id: userId
        },
        {
          password: hashedNewPassword,
        },
      );
      
      return updateUser;

    } catch (error) {
      console.error("Error changing password", error);
    }
  }

  async recoverPassword(userId: string, dni: string): Promise<any> {
    try {
      const existingUser = await UserModel.findOne({
        _id: userId,
      });
  
      if (!existingUser) {
        console.error('There is no existing user!');
        return;
      }
  
      // Hash DNI as new password
      const hashedDNI = await new Argon2id().hash(dni);
      
      await UserModel.findOneAndUpdate(
        {
          _id: userId
        },
        {
          password: hashedDNI,
          last_logged_in: null,
        },
      );

      return 'Password recovered succesfully';
    } catch (error) {
      console.error("Error recovering password", error);
    }
  }

  async saveLastLoggedInDate(userId: string): Promise<any> {
    try {
      await UserModel.findOneAndUpdate(
        {
          _id: userId,
        },
        {
          last_logged_in: new Date(),
        }
      );

      return true;
    } catch (error) {
      console.error("Error saving last logged in date", error);
    }
  }
}

export default UserService;
