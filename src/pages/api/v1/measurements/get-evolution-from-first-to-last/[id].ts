import connectDB from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import MeasurementService from "@/db/services/measurement";
import { Evolution } from "@/types/measurements";
import { getRemainingPercentageFromMeasures } from "@/utils/measurement";

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

      const evolution: Evolution | null = (firstMeasure !== null) ? {
        user_id: lastMeasure.user_id,
        metrics: {
          weight: {
            measure_evolution: getRemainingPercentageFromMeasures(
              firstMeasure.metrics.weight.measure_value as number, 
              lastMeasure.metrics.weight.measure_value as number
            ),
          },
          bmi: {
            measure_evolution: getRemainingPercentageFromMeasures(
              firstMeasure.metrics.bmi.measure_value as number, 
              lastMeasure.metrics.bmi.measure_value as number
            ),
          },
          body_fat: {
            measure_evolution: getRemainingPercentageFromMeasures(
              firstMeasure.metrics.body_fat.measure_value as number, 
              lastMeasure.metrics.body_fat.measure_value as number
            ),
          },
          visc_fat: {
            measure_evolution: getRemainingPercentageFromMeasures(
              firstMeasure.metrics.visc_fat.measure_value as number, 
              lastMeasure.metrics.visc_fat.measure_value as number
            ),
          },
          muscle_mass: {
            measure_evolution: getRemainingPercentageFromMeasures(
              firstMeasure.metrics.muscle_mass.measure_value as number, 
              lastMeasure.metrics.muscle_mass.measure_value as number
            ),
          },
          muscle_quality: {
            measure_evolution: getRemainingPercentageFromMeasures(
              firstMeasure.metrics.muscle_quality.measure_value as number, 
              lastMeasure.metrics.muscle_quality.measure_value as number
            ),
          },
          bone_mass: {
            measure_evolution: getRemainingPercentageFromMeasures(
              firstMeasure.metrics.bone_mass.measure_value as number, 
              lastMeasure.metrics.bone_mass.measure_value as number
            ),
          },
          bmr: {
            measure_evolution: getRemainingPercentageFromMeasures(
              firstMeasure.metrics.bmr.measure_value as number, 
              lastMeasure.metrics.bmr.measure_value as number
            ),
          },
          metab_age: {
            measure_evolution: getRemainingPercentageFromMeasures(
              firstMeasure.metrics.metab_age.measure_value as number, 
              lastMeasure.metrics.metab_age.measure_value as number
            ),
          },
          body_water: {
            measure_evolution: getRemainingPercentageFromMeasures(
              firstMeasure.metrics.body_water.measure_value as number, 
              lastMeasure.metrics.body_water.measure_value as number
            ),
          },
          physique_rating: {
            measure_evolution: getRemainingPercentageFromMeasures(
              firstMeasure.metrics.physique_rating.measure_value as number, 
              lastMeasure.metrics.physique_rating.measure_value as number
            ),
          },
          left_arm: {
            muscle_mass: {
              measure_evolution: getRemainingPercentageFromMeasures(
                firstMeasure.metrics.left_arm.muscle_mass.measure_value as number, 
                lastMeasure.metrics.weight.measure_value as number
              ),
            },
            body_fat: {
              measure_evolution: getRemainingPercentageFromMeasures(
                firstMeasure.metrics.left_arm.body_fat.measure_value as number, 
                lastMeasure.metrics.weight.measure_value as number
              ),
            },
            muscle_quality: {
              measure_evolution: getRemainingPercentageFromMeasures(
                firstMeasure.metrics.left_arm.muscle_quality.measure_value as number, 
                lastMeasure.metrics.weight.measure_value as number
              ),
            },
          },
          right_arm: {
            muscle_mass: {
              measure_evolution: getRemainingPercentageFromMeasures(
                firstMeasure.metrics.right_arm.muscle_mass.measure_value as number, 
                lastMeasure.metrics.weight.measure_value as number
              ),
            },
            body_fat: {
              measure_evolution: getRemainingPercentageFromMeasures(
                firstMeasure.metrics.right_arm.muscle_mass.measure_value as number, 
                lastMeasure.metrics.weight.measure_value as number
              ),
            },
            muscle_quality: {
              measure_evolution: getRemainingPercentageFromMeasures(
                firstMeasure.metrics.right_arm.muscle_mass.measure_value as number, 
                lastMeasure.metrics.weight.measure_value as number
              ),
            },
          },
          left_leg: {
            muscle_mass: {
              measure_evolution: getRemainingPercentageFromMeasures(
                firstMeasure.metrics.left_leg.muscle_mass.measure_value as number, 
                lastMeasure.metrics.weight.measure_value as number
              ),
            },
            body_fat: {
              measure_evolution: getRemainingPercentageFromMeasures(
                firstMeasure.metrics.left_leg.muscle_mass.measure_value as number, 
                lastMeasure.metrics.weight.measure_value as number
              ),
            },
            muscle_quality: {
              measure_evolution: getRemainingPercentageFromMeasures(
                firstMeasure.metrics.left_leg.muscle_mass.measure_value as number, 
                lastMeasure.metrics.weight.measure_value as number
              ),
            },
          },
          right_leg: {
            muscle_mass: {
              measure_evolution: getRemainingPercentageFromMeasures(
                firstMeasure.metrics.right_leg.muscle_mass.measure_value as number, 
                lastMeasure.metrics.weight.measure_value as number
              ),
            },
            body_fat: {
              measure_evolution: getRemainingPercentageFromMeasures(
                firstMeasure.metrics.right_leg.muscle_mass.measure_value as number, 
                lastMeasure.metrics.weight.measure_value as number
              ),
            },
            muscle_quality: {
              measure_evolution: getRemainingPercentageFromMeasures(
                firstMeasure.metrics.right_leg.muscle_mass.measure_value as number, 
                lastMeasure.metrics.weight.measure_value as number
              ),
            },
          },
          trunk: {
            muscle_mass: {
              measure_evolution: getRemainingPercentageFromMeasures(
                firstMeasure.metrics.trunk.muscle_mass.measure_value as number, 
                lastMeasure.metrics.weight.measure_value as number
              ),
            },
            body_fat: {
              measure_evolution: getRemainingPercentageFromMeasures(
                firstMeasure.metrics.trunk.muscle_mass.measure_value as number, 
                lastMeasure.metrics.weight.measure_value as number
              ),
            },
            muscle_quality: {
              measure_evolution: getRemainingPercentageFromMeasures(
                firstMeasure.metrics.trunk.muscle_mass.measure_value as number, 
                lastMeasure.metrics.weight.measure_value as number
              ),
            },
          },
          circumferenceNeck: {
            measure_evolution: getRemainingPercentageFromMeasures(
              firstMeasure?.metrics?.circumferenceNeck?.measure_value as number, 
              lastMeasure?.metrics?.circumferenceNeck?.measure_value as number
            ),
          },
          circumferenceChest: {
            measure_evolution: getRemainingPercentageFromMeasures(
              firstMeasure?.metrics?.circumferenceChest?.measure_value as number, 
              lastMeasure?.metrics?.circumferenceChest?.measure_value as number
            ),
          },
          circumferenceWaist: {
            measure_evolution: getRemainingPercentageFromMeasures(
              firstMeasure?.metrics?.circumferenceWaist?.measure_value as number, 
              lastMeasure?.metrics?.circumferenceWaist?.measure_value as number
            ),
          },
          circumferenceHips: {
            measure_evolution: getRemainingPercentageFromMeasures(
              firstMeasure?.metrics?.circumferenceHips?.measure_value as number, 
              lastMeasure?.metrics?.circumferenceHips?.measure_value as number
            ),
          },
          circumferenceGlutes: {
            measure_evolution: getRemainingPercentageFromMeasures(
              firstMeasure?.metrics?.circumferenceGlutes?.measure_value as number, 
              lastMeasure?.metrics?.circumferenceGlutes?.measure_value as number
            ),
          },
          circumferenceShouldersLeft: {
            measure_evolution: getRemainingPercentageFromMeasures(
              firstMeasure?.metrics?.circumferenceShoulders?.left.measure_value as number, 
              lastMeasure?.metrics?.circumferenceShoulders?.left.measure_value as number
            ),
          },
          circumferenceShouldersRight: {
            measure_evolution: getRemainingPercentageFromMeasures(
              firstMeasure?.metrics?.circumferenceShoulders?.right.measure_value as number, 
              lastMeasure?.metrics?.circumferenceShoulders?.right.measure_value as number
            ),
          },
          circumferenceArmsLeft: {
            measure_evolution: getRemainingPercentageFromMeasures(
              firstMeasure?.metrics?.circumferenceArms?.left.measure_value as number, 
              lastMeasure?.metrics?.circumferenceArms?.left.measure_value as number
            ),
          },
          circumferenceArmsRight: {
            measure_evolution: getRemainingPercentageFromMeasures(
              firstMeasure?.metrics?.circumferenceArms?.right.measure_value as number, 
              lastMeasure?.metrics?.circumferenceArms?.right.measure_value as number
            ),
          },
          circumferenceFlexedArmsLeft: {
            measure_evolution: getRemainingPercentageFromMeasures(
              firstMeasure?.metrics?.circumferenceArms?.left.measure_value as number, 
              lastMeasure?.metrics?.circumferenceArms?.left.measure_value as number
            ),
          },
          circumferenceFlexedArmsRight: {
            measure_evolution: getRemainingPercentageFromMeasures(
              firstMeasure?.metrics?.circumferenceArms?.right.measure_value as number, 
              lastMeasure?.metrics?.circumferenceArms?.right.measure_value as number
            ),
          },
          circumferenceQuadsLeft: {
            measure_evolution: getRemainingPercentageFromMeasures(
              firstMeasure?.metrics?.circumferenceQuads?.left.measure_value as number, 
              lastMeasure?.metrics?.circumferenceQuads?.left.measure_value as number
            ),
          },
          circumferenceQuadsRight: {
            measure_evolution: getRemainingPercentageFromMeasures(
              firstMeasure?.metrics?.circumferenceQuads?.right.measure_value as number, 
              lastMeasure?.metrics?.circumferenceQuads?.right.measure_value as number
            ),
          },
          circumferenceCalfLeft: {
            measure_evolution: getRemainingPercentageFromMeasures(
              firstMeasure?.metrics?.circumferenceCalf?.left.measure_value as number, 
              lastMeasure?.metrics?.circumferenceCalf?.left.measure_value as number
            ),
          },
          circumferenceCalfRight: {
            measure_evolution: getRemainingPercentageFromMeasures(
              firstMeasure?.metrics?.circumferenceCalf?.right.measure_value as number, 
              lastMeasure?.metrics?.circumferenceCalf?.right.measure_value as number
            ),
          }
        }
      } : null;

      res.status(200).json(evolution);
    } catch (e) {
      console.error(e);
    }
  }
}
