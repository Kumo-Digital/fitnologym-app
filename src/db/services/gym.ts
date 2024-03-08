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
}

export default GymService;
