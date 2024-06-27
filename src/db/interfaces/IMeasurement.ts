interface MeasurementObject {
  measure_uom?: string;
  measure_value?: number;
  measure_status?: number;
}

interface CircumferenceObject {
  measure_uom?: string;
  measure_value?: number;
}

export interface IMeasurement {
  _id: string;
  user_id: string;
  date: Date;
  report_url?: string;
  metrics: {
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
    ffmi: {
      measure_value?: number;
      measure_status?: string;
    },
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
    };
    circumferenceNeck?: CircumferenceObject;
    circumferenceChest?: CircumferenceObject;
    circumferenceWaist?: CircumferenceObject;
    circumferenceHips?: CircumferenceObject;
    circumferenceGlutes?: CircumferenceObject;
    circumferenceShoulders?: CircumferenceObject;
    circumferenceArms?: {
      left: CircumferenceObject;
      right: CircumferenceObject;
    };
    circumferenceFlexedArms?: {
      left: CircumferenceObject;
      right: CircumferenceObject;
    };
    circumferenceQuads?: {
      left: CircumferenceObject;
      right: CircumferenceObject;
    };
    circumferenceCalf?: {
      left: CircumferenceObject;
      right: CircumferenceObject;
    };
  }
}