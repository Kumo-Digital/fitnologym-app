import { Schema, model, models } from "mongoose";
import { IMeasurement } from "@/db/interfaces/IMeasurement";

const MeasurementObjSchema = {
  measure_uom: {
    type: String,
    required: false,
  },
  measure_value: {
    type: Number,
    required: false,
  },
  measure_status: {
    type: Number,
    required: false,
  },
};

const CircumferenceObjSchema = {
  measure_uom: {
    type: String,
    required: false,
  },
  measure_value: {
    type: Number,
    required: false,
  },
};

const measurementSchema = new Schema<IMeasurement>(
  {
    _id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    report_url: {
      type: String,
      required: false,
    },
    metrics: {
      weight: MeasurementObjSchema,
      bmi: MeasurementObjSchema,
      body_fat: MeasurementObjSchema,
      visc_fat: MeasurementObjSchema,
      muscle_mass: MeasurementObjSchema,
      muscle_quality: MeasurementObjSchema,
      bone_mass: MeasurementObjSchema,
      bmr: MeasurementObjSchema,
      metab_age: MeasurementObjSchema,
      body_water: MeasurementObjSchema,
      physique_rating: MeasurementObjSchema,
      ffmi: {
        measure_value: {
          type: Number,
          required: false,
        },
        measure_status: {
          type: String,
          required: false,
        },
      },
      left_arm: {
        muscle_mass: MeasurementObjSchema,
        body_fat: MeasurementObjSchema,
        muscle_quality: MeasurementObjSchema,
      },
      right_arm: {
        muscle_mass: MeasurementObjSchema,
        body_fat: MeasurementObjSchema,
        muscle_quality: MeasurementObjSchema,
      },
      left_leg: {
        muscle_mass: MeasurementObjSchema,
        body_fat: MeasurementObjSchema,
        muscle_quality: MeasurementObjSchema,
      },
      right_leg: {
        muscle_mass: MeasurementObjSchema,
        body_fat: MeasurementObjSchema,
        muscle_quality: MeasurementObjSchema,
      },
      trunk: {
        muscle_mass: MeasurementObjSchema,
        body_fat: MeasurementObjSchema,
        muscle_quality: MeasurementObjSchema,
      },
      circumferenceNeck: CircumferenceObjSchema,
      circumferenceChest: CircumferenceObjSchema,
      circumferenceWaist: CircumferenceObjSchema,
      circumferenceHips: CircumferenceObjSchema,
      circumferenceGlutes: CircumferenceObjSchema,
      circumferenceShoulders: CircumferenceObjSchema,
      circumferenceArms: {
        left: CircumferenceObjSchema,
        right: CircumferenceObjSchema,
      },
      circumferenceFlexedArms: {
        left: CircumferenceObjSchema,
        right: CircumferenceObjSchema,
      },
      circumferenceQuads: {
        left: CircumferenceObjSchema,
        right: CircumferenceObjSchema,
      },
      circumferenceCalf: {
        left: CircumferenceObjSchema,
        right: CircumferenceObjSchema,
      },
    },
  } as const,
  {
    timestamps: true,
  }
);

const MeasurementModel =
  models.Measurement || model<IMeasurement>("Measurement", measurementSchema);

export default MeasurementModel;
