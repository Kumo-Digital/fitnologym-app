import GymModel from "@/db/models/GymModel";
import { IGym } from "@/db/interfaces/IGym";

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
    const newGym = await GymModel.create(gymData);
    return newGym;
  }
}

export default GymService;