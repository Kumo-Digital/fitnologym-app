import UserModel, { User } from "@/db/models/UserModel";

class UserService {
  async getAllUsers(): Promise<User[]> {
    const users = await UserModel.find();

    return users;
  }

  async getUserByUid(userId: string): Promise<User | null> {
    const user = await UserModel.findOne({
      uid: userId,
    });

    return user;
  }
}

export default UserService;