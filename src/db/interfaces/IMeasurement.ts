import { Document } from "mongoose";

interface MeasurementObject {
  measure_uom?: string;
  measure_value?: number;
  measure_status?: number;
}

export interface IMeasurement extends Document {
  id: string;
  user_id: number;
  date: Date;
  report_url?: string;
  weight: MeasurementObject;
  bmi: MeasurementObject;
  body_fat: MeasurementObject;
  visc_fat: MeasurementObject;
  muscle_mass: MeasurementObject;
  muscle_quality: MeasurementObject;
  bone_mass: MeasurementObject;
  bmr: MeasurementObject;
  metab_age: MeasurementObject;
  body_water: MeasurementObject;
  physique_rating: MeasurementObject;
  left_arm: {
    muscle_mass: MeasurementObject;
    body_fat: MeasurementObject;
    muscle_quality: MeasurementObject;
  };
  right_arm: {
    muscle_mass: MeasurementObject;
    body_fat: MeasurementObject;
    muscle_quality: MeasurementObject;
  };
  left_leg: {
    muscle_mass: MeasurementObject;
    body_fat: MeasurementObject;
    muscle_quality: MeasurementObject;
  };
  right_leg: {
    muscle_mass: MeasurementObject;
    body_fat: MeasurementObject;
    muscle_quality: MeasurementObject;
  };
  trunk: {
    muscle_mass: MeasurementObject;
    body_fat: MeasurementObject;
    muscle_quality: MeasurementObject;
  };
  circumferenceNeck?: number;
  circumferenceChest?: number;
  circumferenceShoulders?: number;
  circumferenceArms?: number;
  circumferenceWaist?: number;
  circumferenceHips?: number;
  circumferenceGlutes?: number;
  circumferenceQuads?: number;
  circumferenceCalf?: number;
}