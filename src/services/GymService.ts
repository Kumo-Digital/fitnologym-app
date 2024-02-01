import GymModel, { Gym } from "@/db/models/GymModel";

class GymService {
  async getAllGyms(): Promise<Gym[]> {
    const gyms = await GymModel.find();

    return gyms;
  }

  async getGymById(id: string): Promise<Gym | null> {
    const gym = await GymModel.findOne({
      id: id,
    });

    return gym;
  }

  async createGym(gymData: Gym): Promise<Gym> {
    const newGym = await GymModel.create(gymData);
    return newGym;
  }
}

export default GymService;