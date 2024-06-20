import connectDB from "@/lib/db";
import UserService from "@/db/services/user";
import { NextApiRequest, NextApiResponse } from "next";
import MeasurementService from "@/db/services/measurement";
import { Evolution } from "@/types/measurements";
import {
  getRemainingPercentageFromMeasures,
  getRemainingSpecificFromMeasures,
} from "@/utils/measurement";

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
      const previousToLastMeasure =
        await measurementService.getPreviousToLastMeasureByUser(id);

      const evolution: Evolution | null =
        previousToLastMeasure !== null
          ? {
              user_id: lastMeasure.user_id,
              metrics: {
                weight: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      previousToLastMeasure.metrics.weight
                        .measure_value as number,
                      lastMeasure.metrics.weight.measure_value as number
                    ),
                    specific: getRemainingSpecificFromMeasures(
                      previousToLastMeasure.metrics.weight
                        .measure_value as number,
                      lastMeasure.metrics.weight.measure_value as number
                    ),
                  },
                },
                bmi: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      previousToLastMeasure.metrics.bmi.measure_value as number,
                      lastMeasure.metrics.bmi.measure_value as number
                    ),
                    specific: null,
                  },
                },
                body_fat: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      previousToLastMeasure.metrics.body_fat
                        .measure_value as number,
                      lastMeasure.metrics.body_fat.measure_value as number
                    ),
                    specific: null,
                  },
                },
                visc_fat: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      previousToLastMeasure.metrics.visc_fat
                        .measure_value as number,
                      lastMeasure.metrics.visc_fat.measure_value as number
                    ),
                    specific: null,
                  },
                },
                muscle_mass: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      previousToLastMeasure.metrics.muscle_mass
                        .measure_value as number,
                      lastMeasure.metrics.muscle_mass.measure_value as number
                    ),
                    specific: getRemainingSpecificFromMeasures(
                      previousToLastMeasure.metrics.muscle_mass
                        .measure_value as number,
                      lastMeasure.metrics.muscle_mass.measure_value as number
                    ),
                  },
                },
                muscle_quality: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      previousToLastMeasure.metrics.muscle_quality
                        .measure_value as number,
                      lastMeasure.metrics.muscle_quality.measure_value as number
                    ),
                    specific: null,
                  },
                },
                bone_mass: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      previousToLastMeasure.metrics.bone_mass
                        .measure_value as number,
                      lastMeasure.metrics.bone_mass.measure_value as number
                    ),
                    specific: getRemainingSpecificFromMeasures(
                      previousToLastMeasure.metrics.bone_mass
                        .measure_value as number,
                      lastMeasure.metrics.bone_mass.measure_value as number
                    ),
                  },
                },
                bmr: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      previousToLastMeasure.metrics.bmr.measure_value as number,
                      lastMeasure.metrics.bmr.measure_value as number
                    ),
                    specific: null,
                  },
                },
                metab_age: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      previousToLastMeasure.metrics.metab_age
                        .measure_value as number,
                      lastMeasure.metrics.metab_age.measure_value as number
                    ),
                    specific: null,
                  },
                },
                body_water: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      previousToLastMeasure.metrics.body_water
                        .measure_value as number,
                      lastMeasure.metrics.body_water.measure_value as number
                    ),
                    specific: null,
                  },
                },
                physique_rating: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      previousToLastMeasure.metrics.physique_rating
                        .measure_value as number,
                      lastMeasure.metrics.physique_rating
                        .measure_value as number
                    ),
                    specific: null,
                  },
                },
                ffmi: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      previousToLastMeasure.metrics.ffmi
                        .measure_value as number,
                      lastMeasure.metrics.ffmi.measure_value as number
                    ),
                    specific: null,
                  },
                },
                left_arm: {
                  muscle_mass: {
                    measure_evolution: {
                      percentage: getRemainingPercentageFromMeasures(
                        previousToLastMeasure.metrics.left_arm.muscle_mass
                          .measure_value as number,
                        lastMeasure.metrics.left_arm.muscle_mass
                          .measure_value as number
                      ),
                      specific: getRemainingSpecificFromMeasures(
                        previousToLastMeasure.metrics.left_arm.muscle_mass
                          .measure_value as number,
                        lastMeasure.metrics.left_arm.muscle_mass
                          .measure_value as number
                      ),
                    },
                  },
                  body_fat: {
                    measure_evolution: {
                      percentage: getRemainingPercentageFromMeasures(
                        previousToLastMeasure.metrics.left_arm.body_fat
                          .measure_value as number,
                        lastMeasure.metrics.left_arm.body_fat
                          .measure_value as number
                      ),
                      specific: null,
                    },
                  },
                  muscle_quality: {
                    measure_evolution: {
                      percentage: getRemainingPercentageFromMeasures(
                        previousToLastMeasure.metrics.left_arm.muscle_quality
                          .measure_value as number,
                        lastMeasure.metrics.left_arm.muscle_quality
                          .measure_value as number
                      ),
                      specific: null,
                    },
                  },
                },
                right_arm: {
                  muscle_mass: {
                    measure_evolution: {
                      percentage: getRemainingPercentageFromMeasures(
                        previousToLastMeasure.metrics.right_arm.muscle_mass
                          .measure_value as number,
                        lastMeasure.metrics.right_arm.muscle_mass
                          .measure_value as number
                      ),
                      specific: getRemainingSpecificFromMeasures(
                        previousToLastMeasure.metrics.right_arm.muscle_mass
                          .measure_value as number,
                        lastMeasure.metrics.right_arm.muscle_mass
                          .measure_value as number
                      ),
                    },
                  },
                  body_fat: {
                    measure_evolution: {
                      percentage: getRemainingPercentageFromMeasures(
                        previousToLastMeasure.metrics.right_arm.body_fat
                          .measure_value as number,
                        lastMeasure.metrics.right_arm.body_fat
                          .measure_value as number
                      ),
                      specific: null,
                    },
                  },
                  muscle_quality: {
                    measure_evolution: {
                      percentage: getRemainingPercentageFromMeasures(
                        previousToLastMeasure.metrics.right_arm.muscle_quality
                          .measure_value as number,
                        lastMeasure.metrics.right_arm.muscle_quality
                          .measure_value as number
                      ),
                      specific: null,
                    },
                  },
                },
                left_leg: {
                  muscle_mass: {
                    measure_evolution: {
                      percentage: getRemainingPercentageFromMeasures(
                        previousToLastMeasure.metrics.left_leg.muscle_mass
                          .measure_value as number,
                        lastMeasure.metrics.left_leg.muscle_mass
                          .measure_value as number
                      ),
                      specific: getRemainingSpecificFromMeasures(
                        previousToLastMeasure.metrics.left_leg.muscle_mass
                          .measure_value as number,
                        lastMeasure.metrics.left_leg.muscle_mass
                          .measure_value as number
                      ),
                    },
                  },
                  body_fat: {
                    measure_evolution: {
                      percentage: getRemainingPercentageFromMeasures(
                        previousToLastMeasure.metrics.left_leg.body_fat
                          .measure_value as number,
                        lastMeasure.metrics.left_leg.body_fat
                          .measure_value as number
                      ),
                      specific: null,
                    },
                  },
                  muscle_quality: {
                    measure_evolution: {
                      percentage: getRemainingPercentageFromMeasures(
                        previousToLastMeasure.metrics.left_leg.muscle_quality
                          .measure_value as number,
                        lastMeasure.metrics.left_leg.muscle_quality
                          .measure_value as number
                      ),
                      specific: null,
                    },
                  },
                },
                right_leg: {
                  muscle_mass: {
                    measure_evolution: {
                      percentage: getRemainingPercentageFromMeasures(
                        previousToLastMeasure.metrics.right_leg.muscle_mass
                          .measure_value as number,
                        lastMeasure.metrics.right_leg.muscle_mass
                          .measure_value as number
                      ),
                      specific: getRemainingSpecificFromMeasures(
                        previousToLastMeasure.metrics.right_leg.muscle_mass
                          .measure_value as number,
                        lastMeasure.metrics.right_leg.muscle_mass
                          .measure_value as number
                      ),
                    },
                  },
                  body_fat: {
                    measure_evolution: {
                      percentage: getRemainingPercentageFromMeasures(
                        previousToLastMeasure.metrics.right_leg.body_fat
                          .measure_value as number,
                        lastMeasure.metrics.right_leg.body_fat
                          .measure_value as number
                      ),
                      specific: null,
                    },
                  },
                  muscle_quality: {
                    measure_evolution: {
                      percentage: getRemainingPercentageFromMeasures(
                        previousToLastMeasure.metrics.right_leg.muscle_quality
                          .measure_value as number,
                        lastMeasure.metrics.right_leg.muscle_quality
                          .measure_value as number
                      ),
                      specific: null,
                    },
                  },
                },
                trunk: {
                  muscle_mass: {
                    measure_evolution: {
                      percentage: getRemainingPercentageFromMeasures(
                        previousToLastMeasure.metrics.trunk.muscle_mass
                          .measure_value as number,
                        lastMeasure.metrics.trunk.muscle_mass
                          .measure_value as number
                      ),
                      specific: getRemainingSpecificFromMeasures(
                        previousToLastMeasure.metrics.trunk.muscle_mass
                          .measure_value as number,
                        lastMeasure.metrics.trunk.muscle_mass
                          .measure_value as number
                      ),
                    },
                  },
                  body_fat: {
                    measure_evolution: {
                      percentage: getRemainingPercentageFromMeasures(
                        previousToLastMeasure.metrics.trunk.body_fat
                          .measure_value as number,
                        lastMeasure.metrics.trunk.body_fat
                          .measure_value as number
                      ),
                      specific: null,
                    },
                  },
                },
                circumferenceNeck: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      previousToLastMeasure?.metrics?.circumferenceNeck
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
                      previousToLastMeasure?.metrics?.circumferenceChest
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
                      previousToLastMeasure?.metrics?.circumferenceWaist
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
                      previousToLastMeasure?.metrics?.circumferenceHips
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
                      previousToLastMeasure?.metrics?.circumferenceGlutes
                        ?.measure_value as number,
                      lastMeasure?.metrics?.circumferenceGlutes
                        ?.measure_value as number
                    ),
                    specific: null,
                  },
                },
                circumferenceShouldersLeft: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      previousToLastMeasure?.metrics?.circumferenceShoulders
                        ?.left.measure_value as number,
                      lastMeasure?.metrics?.circumferenceShoulders?.left
                        .measure_value as number
                    ),
                    specific: null,
                  },
                },
                circumferenceShouldersRight: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      previousToLastMeasure?.metrics?.circumferenceShoulders
                        ?.right.measure_value as number,
                      lastMeasure?.metrics?.circumferenceShoulders?.right
                        .measure_value as number
                    ),
                    specific: null,
                  },
                },
                circumferenceArmsLeft: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      previousToLastMeasure?.metrics?.circumferenceArms?.left
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
                      previousToLastMeasure?.metrics?.circumferenceArms?.right
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
                      previousToLastMeasure?.metrics?.circumferenceFlexedArms
                        ?.left.measure_value as number,
                      lastMeasure?.metrics?.circumferenceFlexedArms?.left
                        .measure_value as number
                    ),
                    specific: null,
                  },
                },
                circumferenceFlexedArmsRight: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      previousToLastMeasure?.metrics?.circumferenceFlexedArms
                        ?.right.measure_value as number,
                      lastMeasure?.metrics?.circumferenceFlexedArms?.right
                        .measure_value as number
                    ),
                    specific: null,
                  },
                },
                circumferenceQuadsLeft: {
                  measure_evolution: {
                    percentage: getRemainingPercentageFromMeasures(
                      previousToLastMeasure?.metrics?.circumferenceQuads?.left
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
                      previousToLastMeasure?.metrics?.circumferenceQuads?.right
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
                      previousToLastMeasure?.metrics?.circumferenceCalf?.left
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
                      previousToLastMeasure?.metrics?.circumferenceCalf?.right
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
