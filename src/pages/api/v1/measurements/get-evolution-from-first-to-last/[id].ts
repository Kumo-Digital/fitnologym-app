import MeasurementService from "@/db/services/measurement";
import connectDB from "@/lib/db";
import { Evolution } from "@/types/measurements";
import {
  getRemainingPercentageFromMeasures,
  getRemainingSpecificFromMeasures,
} from "@/utils/measurement";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query as { id: string };

    try {
      await connectDB();
      const measurementService = new MeasurementService();

      const lastMeasure = await measurementService.getLastMeasureByUser(id);
      const firstMeasure = await measurementService.getFirstMeasureByUser(id);

      const evolution: Evolution | null =
        firstMeasure !== null
          ? {
              user_id: lastMeasure.user_id,
              metrics: {
                weight: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      firstMeasure.metrics.weight.measure_value as number,
                      lastMeasure.metrics.weight.measure_value as number
                    ),
                    specific: getRemainingSpecificFromMeasures(
                      firstMeasure.metrics.weight.measure_value as number,
                      lastMeasure.metrics.weight.measure_value as number
                    ),
                  },
                },
                bmi: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      firstMeasure.metrics.bmi.measure_value as number,
                      lastMeasure.metrics.bmi.measure_value as number
                    ),
                    specific: getRemainingSpecificFromMeasures(
                      firstMeasure.metrics.bmi.measure_value as number,
                      lastMeasure.metrics.bmi.measure_value as number
                    ),
                  },
                },
                body_fat: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      firstMeasure.metrics.body_fat.measure_value as number,
                      lastMeasure.metrics.body_fat.measure_value as number
                    ),
                    specific: getRemainingSpecificFromMeasures(
                      firstMeasure.metrics.body_fat.measure_value as number,
                      lastMeasure.metrics.body_fat.measure_value as number
                    ),
                  },
                },
                visc_fat: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      firstMeasure.metrics.visc_fat.measure_value as number,
                      lastMeasure.metrics.visc_fat.measure_value as number
                    ),
                    specific: getRemainingSpecificFromMeasures(
                      firstMeasure.metrics.visc_fat.measure_value as number,
                      lastMeasure.metrics.visc_fat.measure_value as number
                    ),
                  },
                },
                muscle_mass: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      firstMeasure.metrics.muscle_mass.measure_value as number,
                      lastMeasure.metrics.muscle_mass.measure_value as number
                    ),
                    specific: getRemainingSpecificFromMeasures(
                      firstMeasure.metrics.muscle_mass.measure_value as number,
                      lastMeasure.metrics.muscle_mass.measure_value as number
                    ),
                  },
                },
                muscle_quality: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      firstMeasure.metrics.muscle_quality
                        .measure_value as number,
                      lastMeasure.metrics.muscle_quality.measure_value as number
                    ),
                    specific: getRemainingSpecificFromMeasures(
                      firstMeasure.metrics.muscle_quality
                        .measure_value as number,
                      lastMeasure.metrics.muscle_quality.measure_value as number
                    ),
                  },
                },
                bone_mass: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      firstMeasure.metrics.bone_mass.measure_value as number,
                      lastMeasure.metrics.bone_mass.measure_value as number
                    ),
                    specific: getRemainingSpecificFromMeasures(
                      firstMeasure.metrics.bone_mass.measure_value as number,
                      lastMeasure.metrics.bone_mass.measure_value as number
                    ),
                  },
                },
                bmr: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      firstMeasure.metrics.bmr.measure_value as number,
                      lastMeasure.metrics.bmr.measure_value as number
                    ),
                    specific: getRemainingSpecificFromMeasures(
                      firstMeasure.metrics.bmr.measure_value as number,
                      lastMeasure.metrics.bmr.measure_value as number
                    ),
                  },
                },
                metab_age: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      firstMeasure.metrics.metab_age.measure_value as number,
                      lastMeasure.metrics.metab_age.measure_value as number
                    ),
                    specific: getRemainingSpecificFromMeasures(
                      firstMeasure.metrics.metab_age.measure_value as number,
                      lastMeasure.metrics.metab_age.measure_value as number
                    ),
                  },
                },
                body_water: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      firstMeasure.metrics.body_water.measure_value as number,
                      lastMeasure.metrics.body_water.measure_value as number
                    ),
                    specific: getRemainingSpecificFromMeasures(
                      firstMeasure.metrics.body_water.measure_value as number,
                      lastMeasure.metrics.body_water.measure_value as number
                    ),
                  },
                },
                physique_rating: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      firstMeasure.metrics.physique_rating
                        .measure_value as number,
                      lastMeasure.metrics.physique_rating
                        .measure_value as number
                    ),
                    specific: getRemainingSpecificFromMeasures(
                      firstMeasure.metrics.physique_rating
                        .measure_value as number,
                      lastMeasure.metrics.physique_rating
                        .measure_value as number
                    ),
                  },
                },
                dryProtein: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      firstMeasure.metrics.dryProtein.measure_value as number,
                      lastMeasure.metrics.dryProtein.measure_value as number
                    ),
                    specific: getRemainingSpecificFromMeasures(
                      firstMeasure.metrics.dryProtein.measure_value as number,
                      lastMeasure.metrics.dryProtein.measure_value as number
                    ),
                  },
                },
                ffmi: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      firstMeasure.metrics.ffmi.measure_value as number,
                      lastMeasure.metrics.ffmi.measure_value as number
                    ),
                    specific: getRemainingSpecificFromMeasures(
                      firstMeasure.metrics.ffmi.measure_value as number,
                      lastMeasure.metrics.ffmi.measure_value as number
                    ),
                  },
                },
                left_arm: {
                  muscle_mass: {
                    measure_evolution: {
                      percentage: getRemainingPercentageFromMeasures(
                        firstMeasure.metrics.left_arm.muscle_mass
                          .measure_value as number,
                        lastMeasure.metrics.left_arm.muscle_mass
                          .measure_value as number
                      ),
                      specific: getRemainingSpecificFromMeasures(
                        firstMeasure.metrics.left_arm.muscle_mass
                          .measure_value as number,
                        lastMeasure.metrics.left_arm.muscle_mass
                          .measure_value as number
                      ),
                    },
                  },
                  body_fat: {
                    measure_evolution: {
                      percentage: getRemainingPercentageFromMeasures(
                        firstMeasure.metrics.left_arm.body_fat
                          .measure_value as number,
                        lastMeasure.metrics.left_arm.body_fat
                          .measure_value as number
                      ),
                      specific: getRemainingSpecificFromMeasures(
                        firstMeasure.metrics.left_arm.body_fat
                          .measure_value as number,
                        lastMeasure.metrics.left_arm.body_fat
                          .measure_value as number
                      ),
                    },
                  },
                  muscle_quality: {
                    measure_evolution: {
                      percentage: getRemainingPercentageFromMeasures(
                        firstMeasure.metrics.left_arm.muscle_quality
                          .measure_value as number,
                        lastMeasure.metrics.left_arm.muscle_quality
                          .measure_value as number
                      ),
                      specific: getRemainingSpecificFromMeasures(
                        firstMeasure.metrics.left_arm.muscle_quality
                          .measure_value as number,
                        lastMeasure.metrics.left_arm.muscle_quality
                          .measure_value as number
                      ),
                    },
                  },
                },
                right_arm: {
                  muscle_mass: {
                    measure_evolution: {
                      percentage: getRemainingPercentageFromMeasures(
                        firstMeasure.metrics.right_arm.muscle_mass
                          .measure_value as number,
                        lastMeasure.metrics.right_arm.muscle_mass
                          .measure_value as number
                      ),
                      specific: getRemainingSpecificFromMeasures(
                        firstMeasure.metrics.right_arm.muscle_mass
                          .measure_value as number,
                        lastMeasure.metrics.right_arm.muscle_mass
                          .measure_value as number
                      ),
                    },
                  },
                  body_fat: {
                    measure_evolution: {
                      percentage: getRemainingPercentageFromMeasures(
                        firstMeasure.metrics.right_arm.body_fat
                          .measure_value as number,
                        lastMeasure.metrics.right_arm.body_fat
                          .measure_value as number
                      ),
                      specific: getRemainingSpecificFromMeasures(
                        firstMeasure.metrics.right_arm.body_fat
                          .measure_value as number,
                        lastMeasure.metrics.right_arm.body_fat
                          .measure_value as number
                      ),
                    },
                  },
                  muscle_quality: {
                    measure_evolution: {
                      percentage: getRemainingPercentageFromMeasures(
                        firstMeasure.metrics.right_arm.muscle_quality
                          .measure_value as number,
                        lastMeasure.metrics.right_arm.muscle_quality
                          .measure_value as number
                      ),
                      specific: getRemainingSpecificFromMeasures(
                        firstMeasure.metrics.right_arm.muscle_quality
                          .measure_value as number,
                        lastMeasure.metrics.right_arm.muscle_quality
                          .measure_value as number
                      ),
                    },
                  },
                },
                left_leg: {
                  muscle_mass: {
                    measure_evolution: {
                      percentage: getRemainingPercentageFromMeasures(
                        firstMeasure.metrics.left_leg.muscle_mass
                          .measure_value as number,
                        lastMeasure.metrics.left_leg.muscle_mass
                          .measure_value as number
                      ),
                      specific: getRemainingSpecificFromMeasures(
                        firstMeasure.metrics.left_leg.muscle_mass
                          .measure_value as number,
                        lastMeasure.metrics.left_leg.muscle_mass
                          .measure_value as number
                      ),
                    },
                  },
                  body_fat: {
                    measure_evolution: {
                      percentage: getRemainingPercentageFromMeasures(
                        firstMeasure.metrics.left_leg.body_fat
                          .measure_value as number,
                        lastMeasure.metrics.left_leg.body_fat
                          .measure_value as number
                      ),
                      specific: getRemainingSpecificFromMeasures(
                        firstMeasure.metrics.left_leg.body_fat
                          .measure_value as number,
                        lastMeasure.metrics.left_leg.body_fat
                          .measure_value as number
                      ),
                    },
                  },
                  muscle_quality: {
                    measure_evolution: {
                      percentage: getRemainingPercentageFromMeasures(
                        firstMeasure.metrics.left_leg.muscle_quality
                          .measure_value as number,
                        lastMeasure.metrics.left_leg.muscle_quality
                          .measure_value as number
                      ),
                      specific: getRemainingSpecificFromMeasures(
                        firstMeasure.metrics.left_leg.muscle_quality
                          .measure_value as number,
                        lastMeasure.metrics.left_leg.muscle_quality
                          .measure_value as number
                      ),
                    },
                  },
                },
                right_leg: {
                  muscle_mass: {
                    measure_evolution: {
                      percentage: getRemainingPercentageFromMeasures(
                        firstMeasure.metrics.right_leg.muscle_mass
                          .measure_value as number,
                        lastMeasure.metrics.right_leg.muscle_mass
                          .measure_value as number
                      ),
                      specific: getRemainingSpecificFromMeasures(
                        firstMeasure.metrics.right_leg.muscle_mass
                          .measure_value as number,
                        lastMeasure.metrics.right_leg.muscle_mass
                          .measure_value as number
                      ),
                    },
                  },
                  body_fat: {
                    measure_evolution: {
                      percentage: getRemainingPercentageFromMeasures(
                        firstMeasure.metrics.right_leg.body_fat
                          .measure_value as number,
                        lastMeasure.metrics.right_leg.body_fat
                          .measure_value as number
                      ),
                      specific: getRemainingSpecificFromMeasures(
                        firstMeasure.metrics.right_leg.body_fat
                          .measure_value as number,
                        lastMeasure.metrics.right_leg.body_fat
                          .measure_value as number
                      ),
                    },
                  },
                  muscle_quality: {
                    measure_evolution: {
                      percentage: getRemainingPercentageFromMeasures(
                        firstMeasure.metrics.right_leg.muscle_quality
                          .measure_value as number,
                        lastMeasure.metrics.right_leg.muscle_quality
                          .measure_value as number
                      ),
                      specific: getRemainingSpecificFromMeasures(
                        firstMeasure.metrics.right_leg.muscle_quality
                          .measure_value as number,
                        lastMeasure.metrics.right_leg.muscle_quality
                          .measure_value as number
                      ),
                    },
                  },
                },
                trunk: {
                  muscle_mass: {
                    measure_evolution: {
                      percentage: getRemainingPercentageFromMeasures(
                        firstMeasure.metrics.trunk.muscle_mass
                          .measure_value as number,
                        lastMeasure.metrics.trunk.muscle_mass
                          .measure_value as number
                      ),
                      specific: getRemainingSpecificFromMeasures(
                        firstMeasure.metrics.trunk.muscle_mass
                          .measure_value as number,
                        lastMeasure.metrics.trunk.muscle_mass
                          .measure_value as number
                      ),
                    },
                  },
                  body_fat: {
                    measure_evolution: {
                      percentage: getRemainingPercentageFromMeasures(
                        firstMeasure.metrics.trunk.body_fat
                          .measure_value as number,
                        lastMeasure.metrics.trunk.body_fat
                          .measure_value as number
                      ),
                      specific: getRemainingSpecificFromMeasures(
                        firstMeasure.metrics.trunk.body_fat
                          .measure_value as number,
                        lastMeasure.metrics.trunk.body_fat
                          .measure_value as number
                      ),
                    },
                  },
                },
                circumferenceNeck: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      firstMeasure?.metrics?.circumferenceNeck
                        ?.measure_value as number,
                      lastMeasure?.metrics?.circumferenceNeck
                        ?.measure_value as number
                    ),
                    specific: null,
                  },
                },
                circumferenceChest: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      firstMeasure?.metrics?.circumferenceChest
                        ?.measure_value as number,
                      lastMeasure?.metrics?.circumferenceChest
                        ?.measure_value as number
                    ),
                    specific: null,
                  },
                },
                circumferenceWaist: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      firstMeasure?.metrics?.circumferenceWaist
                        ?.measure_value as number,
                      lastMeasure?.metrics?.circumferenceWaist
                        ?.measure_value as number
                    ),
                    specific: null,
                  },
                },
                circumferenceHips: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      firstMeasure?.metrics?.circumferenceHips
                        ?.measure_value as number,
                      lastMeasure?.metrics?.circumferenceHips
                        ?.measure_value as number
                    ),
                    specific: null,
                  },
                },
                circumferenceGlutes: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      firstMeasure?.metrics?.circumferenceGlutes
                        ?.measure_value as number,
                      lastMeasure?.metrics?.circumferenceGlutes
                        ?.measure_value as number
                    ),
                    specific: null,
                  },
                },
                circumferenceShoulders: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      firstMeasure?.metrics?.circumferenceShoulders
                        ?.measure_value as number,
                      lastMeasure?.metrics?.circumferenceShoulders
                        ?.measure_value as number
                    ),
                    specific: null,
                  },
                },
                circumferenceArmsLeft: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      firstMeasure?.metrics?.circumferenceArms?.left
                        .measure_value as number,
                      lastMeasure?.metrics?.circumferenceArms?.left
                        .measure_value as number
                    ),
                    specific: null,
                  },
                },
                circumferenceArmsRight: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      firstMeasure?.metrics?.circumferenceArms?.right
                        .measure_value as number,
                      lastMeasure?.metrics?.circumferenceArms?.right
                        .measure_value as number
                    ),
                    specific: null,
                  },
                },
                circumferenceFlexedArmsLeft: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      firstMeasure?.metrics?.circumferenceArms?.left
                        .measure_value as number,
                      lastMeasure?.metrics?.circumferenceArms?.left
                        .measure_value as number
                    ),
                    specific: null,
                  },
                },
                circumferenceFlexedArmsRight: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      firstMeasure?.metrics?.circumferenceArms?.right
                        .measure_value as number,
                      lastMeasure?.metrics?.circumferenceArms?.right
                        .measure_value as number
                    ),
                    specific: null,
                  },
                },
                circumferenceQuadsLeft: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      firstMeasure?.metrics?.circumferenceQuads?.left
                        .measure_value as number,
                      lastMeasure?.metrics?.circumferenceQuads?.left
                        .measure_value as number
                    ),
                    specific: null,
                  },
                },
                circumferenceQuadsRight: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      firstMeasure?.metrics?.circumferenceQuads?.right
                        .measure_value as number,
                      lastMeasure?.metrics?.circumferenceQuads?.right
                        .measure_value as number
                    ),
                    specific: null,
                  },
                },
                circumferenceCalfLeft: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      firstMeasure?.metrics?.circumferenceCalf?.left
                        .measure_value as number,
                      lastMeasure?.metrics?.circumferenceCalf?.left
                        .measure_value as number
                    ),
                    specific: null,
                  },
                },
                circumferenceCalfRight: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      firstMeasure?.metrics?.circumferenceCalf?.right
                        .measure_value as number,
                      lastMeasure?.metrics?.circumferenceCalf?.right
                        .measure_value as number
                    ),
                    specific: null,
                  },
                },
              },
            }
          : null;

      res.status(200).json(evolution);
    } catch (e) {
      console.error(e);
    }
  }
}
