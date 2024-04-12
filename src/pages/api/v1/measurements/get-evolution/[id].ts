import connectDB from "@/lib/db";
import UserService from "@/db/services/user";
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
      const previousToLastMeasure = await measurementService.getPreviousToLastMeasureByUser(id);

      const evolution: Evolution | null = (previousToLastMeasure !== null) ? {
        user_id: lastMeasure.user_id,
        metrics: {
          weight: {
            measure_evolution: getRemainingPercentageFromMeasures(
              previousToLastMeasure.metrics.weight.measure_value as number, 
              lastMeasure.metrics.weight.measure_value as number
            ),
          },
          bmi: {
            measure_evolution: getRemainingPercentageFromMeasures(
              previousToLastMeasure.metrics.bmi.measure_value as number, 
              lastMeasure.metrics.bmi.measure_value as number
            ),
          },
          body_fat: {
            measure_evolution: getRemainingPercentageFromMeasures(
              previousToLastMeasure.metrics.body_fat.measure_value as number, 
              lastMeasure.metrics.body_fat.measure_value as number
            ),
          },
          visc_fat: {
            measure_evolution: getRemainingPercentageFromMeasures(
              previousToLastMeasure.metrics.visc_fat.measure_value as number, 
              lastMeasure.metrics.visc_fat.measure_value as number
            ),
          },
          muscle_mass: {
            measure_evolution: getRemainingPercentageFromMeasures(
              previousToLastMeasure.metrics.muscle_mass.measure_value as number, 
              lastMeasure.metrics.muscle_mass.measure_value as number
            ),
          },
          muscle_quality: {
            measure_evolution: getRemainingPercentageFromMeasures(
              previousToLastMeasure.metrics.muscle_quality.measure_value as number, 
              lastMeasure.metrics.muscle_quality.measure_value as number
            ),
          },
          bone_mass: {
            measure_evolution: getRemainingPercentageFromMeasures(
              previousToLastMeasure.metrics.bone_mass.measure_value as number, 
              lastMeasure.metrics.bone_mass.measure_value as number
            ),
          },
          bmr: {
            measure_evolution: getRemainingPercentageFromMeasures(
              previousToLastMeasure.metrics.bmr.measure_value as number, 
              lastMeasure.metrics.bmr.measure_value as number
            ),
          },
          metab_age: {
            measure_evolution: getRemainingPercentageFromMeasures(
              previousToLastMeasure.metrics.metab_age.measure_value as number, 
              lastMeasure.metrics.metab_age.measure_value as number
            ),
          },
          body_water: {
            measure_evolution: getRemainingPercentageFromMeasures(
              previousToLastMeasure.metrics.body_water.measure_value as number, 
              lastMeasure.metrics.body_water.measure_value as number
            ),
          },
          physique_rating: {
            measure_evolution: getRemainingPercentageFromMeasures(
              previousToLastMeasure.metrics.physique_rating.measure_value as number, 
              lastMeasure.metrics.physique_rating.measure_value as number
            ),
          },
          left_arm: {
            muscle_mass: {
              measure_evolution: getRemainingPercentageFromMeasures(
                previousToLastMeasure.metrics.left_arm.muscle_mass.measure_value as number, 
                lastMeasure.metrics.weight.measure_value as number
              ),
            },
            body_fat: {
              measure_evolution: getRemainingPercentageFromMeasures(
                previousToLastMeasure.metrics.left_arm.body_fat.measure_value as number, 
                lastMeasure.metrics.weight.measure_value as number
              ),
            },
            muscle_quality: {
              measure_evolution: getRemainingPercentageFromMeasures(
                previousToLastMeasure.metrics.left_arm.muscle_quality.measure_value as number, 
                lastMeasure.metrics.weight.measure_value as number
              ),
            },
          },
          right_arm: {
            muscle_mass: {
              measure_evolution: getRemainingPercentageFromMeasures(
                previousToLastMeasure.metrics.right_arm.muscle_mass.measure_value as number, 
                lastMeasure.metrics.weight.measure_value as number
              ),
            },
            body_fat: {
              measure_evolution: getRemainingPercentageFromMeasures(
                previousToLastMeasure.metrics.right_arm.muscle_mass.measure_value as number, 
                lastMeasure.metrics.weight.measure_value as number
              ),
            },
            muscle_quality: {
              measure_evolution: getRemainingPercentageFromMeasures(
                previousToLastMeasure.metrics.right_arm.muscle_mass.measure_value as number, 
                lastMeasure.metrics.weight.measure_value as number
              ),
            },
          },
          left_leg: {
            muscle_mass: {
              measure_evolution: getRemainingPercentageFromMeasures(
                previousToLastMeasure.metrics.left_leg.muscle_mass.measure_value as number, 
                lastMeasure.metrics.weight.measure_value as number
              ),
            },
            body_fat: {
              measure_evolution: getRemainingPercentageFromMeasures(
                previousToLastMeasure.metrics.left_leg.muscle_mass.measure_value as number, 
                lastMeasure.metrics.weight.measure_value as number
              ),
            },
            muscle_quality: {
              measure_evolution: getRemainingPercentageFromMeasures(
                previousToLastMeasure.metrics.left_leg.muscle_mass.measure_value as number, 
                lastMeasure.metrics.weight.measure_value as number
              ),
            },
          },
          right_leg: {
            muscle_mass: {
              measure_evolution: getRemainingPercentageFromMeasures(
                previousToLastMeasure.metrics.right_leg.muscle_mass.measure_value as number, 
                lastMeasure.metrics.weight.measure_value as number
              ),
            },
            body_fat: {
              measure_evolution: getRemainingPercentageFromMeasures(
                previousToLastMeasure.metrics.right_leg.muscle_mass.measure_value as number, 
                lastMeasure.metrics.weight.measure_value as number
              ),
            },
            muscle_quality: {
              measure_evolution: getRemainingPercentageFromMeasures(
                previousToLastMeasure.metrics.right_leg.muscle_mass.measure_value as number, 
                lastMeasure.metrics.weight.measure_value as number
              ),
            },
          },
          trunk: {
            muscle_mass: {
              measure_evolution: getRemainingPercentageFromMeasures(
                previousToLastMeasure.metrics.trunk.muscle_mass.measure_value as number, 
                lastMeasure.metrics.weight.measure_value as number
              ),
            },
            body_fat: {
              measure_evolution: getRemainingPercentageFromMeasures(
                previousToLastMeasure.metrics.trunk.muscle_mass.measure_value as number, 
                lastMeasure.metrics.weight.measure_value as number
              ),
            },
            muscle_quality: {
              measure_evolution: getRemainingPercentageFromMeasures(
                previousToLastMeasure.metrics.trunk.muscle_mass.measure_value as number, 
                lastMeasure.metrics.weight.measure_value as number
              ),
            },
          },
          circumferenceNeck: {
            measure_evolution: getRemainingPercentageFromMeasures(
              previousToLastMeasure?.metrics?.circumferenceNeck?.measure_value as number, 
              lastMeasure?.metrics?.circumferenceNeck?.measure_value as number
            ),
          },
          circumferenceChest: {
            measure_evolution: getRemainingPercentageFromMeasures(
              previousToLastMeasure?.metrics?.circumferenceChest?.measure_value as number, 
              lastMeasure?.metrics?.circumferenceChest?.measure_value as number
            ),
          },
          circumferenceShoulders: {
            measure_evolution: getRemainingPercentageFromMeasures(
              previousToLastMeasure?.metrics?.circumferenceShoulders?.measure_value as number, 
              lastMeasure?.metrics?.circumferenceShoulders?.measure_value as number
            ),
          },
          circumferenceArms: {
            measure_evolution: getRemainingPercentageFromMeasures(
              previousToLastMeasure?.metrics?.circumferenceArms?.measure_value as number, 
              lastMeasure?.metrics?.circumferenceArms?.measure_value as number
            ),
          },
          circumferenceWaist: {
            measure_evolution: getRemainingPercentageFromMeasures(
              previousToLastMeasure?.metrics?.circumferenceWaist?.measure_value as number, 
              lastMeasure?.metrics?.circumferenceWaist?.measure_value as number
            ),
          },
          circumferenceHips: {
            measure_evolution: getRemainingPercentageFromMeasures(
              previousToLastMeasure?.metrics?.circumferenceHips?.measure_value as number, 
              lastMeasure?.metrics?.circumferenceHips?.measure_value as number
            ),
          },
          circumferenceGlutes: {
            measure_evolution: getRemainingPercentageFromMeasures(
              previousToLastMeasure?.metrics?.circumferenceGlutes?.measure_value as number, 
              lastMeasure?.metrics?.circumferenceGlutes?.measure_value as number
            ),
          },
          circumferenceQuads: {
            measure_evolution: getRemainingPercentageFromMeasures(
              previousToLastMeasure?.metrics?.circumferenceQuads?.measure_value as number, 
              lastMeasure?.metrics?.circumferenceQuads?.measure_value as number
            ),
          },
          circumferenceCalf: {
            measure_evolution: getRemainingPercentageFromMeasures(
              previousToLastMeasure?.metrics?.circumferenceCalf?.measure_value as number, 
              lastMeasure?.metrics?.circumferenceCalf?.measure_value as number
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
