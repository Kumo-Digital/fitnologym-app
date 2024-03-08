import { IMeasurement } from "@/db/interfaces/IMeasurement";
import { MeasurementFormValues } from "@/types/admin";
import { generateId } from "lucia";

export const prepareMeasurementForInsert = (payload: MeasurementFormValues): IMeasurement => {
  const measurementId = generateId(18);
  const preparedMeasurement = {
    _id: measurementId,
    user_id: payload.user_id,
    date: new Date(),
    report_url: payload.report_url ?? '',
    weight: {
      measure_uom: 'kg',
      measure_value: payload.weight ?? 0,
      measure_status: parseInt(payload.weightStatus) ?? 2,
    },
    bmi: {
      measure_uom: 'u',
      measure_value: payload.bmi ?? 0,
      measure_status: parseInt(payload.bmiStatus) ?? 2,
    },
    body_fat: {
      measure_uom: '%',
      measure_value: payload.bodyFat ?? 0,
      measure_status: parseInt(payload.bodyFatStatus) ?? 2,
    },
    visc_fat: {
      measure_uom: 'u',
      measure_value: payload.viscFat ?? 0,
      measure_status: parseInt(payload.viscFatStatus) ?? 2,
    },
    muscle_mass: {
      measure_uom: 'kg',
      measure_value: payload.muscleMass ?? 0,
      measure_status: parseInt(payload.muscleMassStatus) ?? 2,
    },
    muscle_quality: {
      measure_uom: 'u',
      measure_value: payload.muscleQuality ?? 0,
      measure_status: parseInt(payload.muscleQualityStatus) ?? 2,
    },
    bone_mass: {
      measure_uom: 'kg',
      measure_value: payload.boneMass ?? 0,
      measure_status: parseInt(payload.boneMassStatus) ?? 2,
    },
    bmr: {
      measure_uom: 'kcal',
      measure_value: payload.bmr ?? 0,
      measure_status: parseInt(payload.bmrStatus) ?? 2,
    },
    metab_age: {
      measure_uom: 'u',
      measure_value: payload.metabAge ?? 0,
      measure_status: parseInt(payload.metabAgeStatus) ?? 2,
    },
    body_water: {
      measure_uom: '%',
      measure_value: payload.bodyWater ?? 0,
      measure_status: parseInt(payload.bodyWaterStatus) ?? 2,
    },
    physique_rating: {
      measure_uom: 'u',
      measure_value: payload.physiqueRating ?? 0,
      measure_status: parseInt(payload.physiqueRatingStatus) ?? 2,
    },
    left_arm: {
      muscle_mass: {
        measure_uom: 'kg',
        measure_value: payload.armLeftMuscleMass ?? 0,
        measure_status: parseInt(payload.armLeftMuscleMassStatus) ?? 2,
      },
      body_fat: {
        measure_uom: '%',
        measure_value: payload.armLeftBodyFat ?? 0,
        measure_status: parseInt(payload.armLeftBodyFatStatus) ?? 2,
      },
      muscle_quality: {
        measure_uom: 'u',
        measure_value: payload.armLeftMuscleQuality ?? 0,
        measure_status: parseInt(payload.armLeftMuscleQualityStatus) ?? 2,
      },
    },
    right_arm: {
      muscle_mass: {
        measure_uom: 'kg',
        measure_value: payload.armRightMuscleMass ?? 0,
        measure_status: parseInt(payload.armRightMuscleMassStatus) ?? 2,
      },
      body_fat: {
        measure_uom: '%',
        measure_value: payload.armRightBodyFat ?? 0,
        measure_status: parseInt(payload.armRightBodyFatStatus) ?? 2,
      },
      muscle_quality: {
        measure_uom: 'u',
        measure_value: payload.armRightMuscleQuality ?? 0,
        measure_status: parseInt(payload.armRightMuscleQualityStatus) ?? 2,
      },
    },
    left_leg: {
      muscle_mass: {
        measure_uom: 'kg',
        measure_value: payload.legLeftMuscleMass ?? 0,
        measure_status: parseInt(payload.legLeftMuscleMassStatus) ?? 2,
      },
      body_fat: {
        measure_uom: '%',
        measure_value: payload.legLeftBodyFat ?? 0,
        measure_status: parseInt(payload.legLeftBodyFatStatus) ?? 2,
      },
      muscle_quality: {
        measure_uom: 'u',
        measure_value: payload.legLeftMuscleQuality ?? 0,
        measure_status: parseInt(payload.legLeftMuscleQualityStatus) ?? 2,
      },
    },
    right_leg: {
      muscle_mass: {
        measure_uom: 'kg',
        measure_value: payload.legRightMuscleMass ?? 0,
        measure_status: parseInt(payload.legRightMuscleMassStatus) ?? 2,
      },
      body_fat: {
        measure_uom: '%',
        measure_value: payload.legRightBodyFat ?? 0,
        measure_status: parseInt(payload.legRightBodyFatStatus) ?? 2,
      },
      muscle_quality: {
        measure_uom: 'u',
        measure_value: payload.legRightMuscleQuality ?? 0,
        measure_status: parseInt(payload.legRightMuscleQualityStatus) ?? 2,
      },
    },
    trunk: {
      muscle_mass: {
        measure_uom: 'kg',
        measure_value: payload.trunkMuscleMass ?? 0,
        measure_status: parseInt(payload.trunkMuscleMassStatus) ?? 2,
      },
      body_fat: {
        measure_uom: '%',
        measure_value: payload.trunkBodyFat ?? 0,
        measure_status: parseInt(payload.trunkBodyFatStatus) ?? 2,
      },
      muscle_quality: {
        measure_uom: 'u',
        measure_value: payload.trunkMuscleQuality ?? 0,
        measure_status: parseInt(payload.trunkMuscleQualityStatus) ?? 2,
      },
    },
    circumferenceNeck: {
      measure_uom: 'cm',
      measure_value: payload.circumferenceNeck ?? 0
    },
    circumferenceChest: {
      measure_uom: 'cm',
      measure_value: payload.circumferenceChest ?? 0
    },
    circumferenceShoulders: {
      measure_uom: 'cm',
      measure_value: payload.circumferenceShoulders ?? 0
    },
    circumferenceArms: {
      measure_uom: 'cm',
      measure_value: payload.circumferenceArms ?? 0
    },
    circumferenceWaist: {
      measure_uom: 'cm',
      measure_value: payload.circumferenceWaist ?? 0
    },
    circumferenceHips: {
      measure_uom: 'cm',
      measure_value: payload.circumferenceHips ?? 0
    },
    circumferenceGlutes: {
      measure_uom: 'cm',
      measure_value: payload.circumferenceGlutes ?? 0
    },
    circumferenceQuads: {
      measure_uom: 'cm',
      measure_value: payload.circumferenceQuads ?? 0
    },
    circumferenceCalf: {
      measure_uom: 'cm',
      measure_value: payload.circumferenceCalf ?? 0
    },
  }

  return preparedMeasurement;
}