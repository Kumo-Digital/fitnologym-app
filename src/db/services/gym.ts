import GymModel from "@/db/models/GymModel";
import { IGym } from "@/db/interfaces/IGym";
import { generateId } from "lucia";

class GymService {
  async getAllGyms(): Promise<IGym[]> {
    const gyms = await GymModel.find();

    return gyms;
  }

  async getGymById(id: string): Promise<IGym | null> {
    const gym = await GymModel.findOne({
      id: id,
    });

    return gym;
  }

  async createGym(gymData: IGym): Promise<IGym> {
    const gymId = generateId(8);

    const newGym = await GymModel.create({ ...gymData, id: gymId });
    return newGym;
  }

  async editGym(gymData: IGym, id: string): Promise<any> {
    try {
      const editedGym = await GymModel.findOneAndUpdate({ id: id }, gymData, {
        new: true,
      });

      return editedGym;
    } catch (e) {
      console.error(e);
    }
  }

  async deleteGym(id: string): Promise<any> {
    try {
      const deletedGym = await GymModel.findOneAndDelete({ id: id });

      return deletedGym;
    } catch (e) {
      console.error(e);
    }
  }
}

export default GymService;
