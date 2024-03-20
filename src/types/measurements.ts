export interface Measurement {
  _id: string;
  user_id: string;
  date: string;
  report_url?: string;
  createdAt: string;
  updatedAt: string;
  metrics: any;
}

export interface ReportEntry {
  name: string;
  date: string;
  report_url: string | null;
}

export interface Metrics {
  uom: string;
  filtered_metrics: Record<string, number | string>[];
}

export interface Evolution {
  user_id: string;
  metrics: {
    weight: {
      measure_evolution: number,
    },
    bmi: {
      measure_evolution: number,
    },
    body_fat: {
      measure_evolution: number,
    },
    visc_fat: {
      measure_evolution: number,
    },
    muscle_mass: {
      measure_evolution: number,
    },
    muscle_quality: {
      measure_evolution: number,
    },
    bone_mass: {
      measure_evolution: number,
    },
    bmr: {
      measure_evolution: number,
    },
    metab_age: {
      measure_evolution: number,
    },
    body_water: {
      measure_evolution: number,
    },
    physique_rating: {
      measure_evolution: number,
    },
    left_arm: {
      muscle_mass: {
        measure_evolution: number,
      },
      body_fat: {
        measure_evolution: number,
      },
      muscle_quality: {
        measure_evolution: number,
      },
    };
    right_arm: {
      muscle_mass: {
        measure_evolution: number,
      },
      body_fat: {
        measure_evolution: number,
      },
      muscle_quality: {
        measure_evolution: number,
      },
    };
    left_leg: {
      muscle_mass: {
        measure_evolution: number,
      },
      body_fat: {
        measure_evolution: number,
      },
      muscle_quality: {
        measure_evolution: number,
      },
    };
    right_leg: {
      muscle_mass: {
        measure_evolution: number,
      },
      body_fat: {
        measure_evolution: number,
      },
      muscle_quality: {
        measure_evolution: number,
      },
    };
    trunk: {
      muscle_mass: {
        measure_evolution: number,
      },
      body_fat: {
        measure_evolution: number,
      },
      muscle_quality: {
        measure_evolution: number,
      },
    };
    circumferenceNeck: {
      measure_evolution: number,
    },
    circumferenceChest: {
      measure_evolution: number,
    },
    circumferenceShoulders: {
      measure_evolution: number,
    },
    circumferenceArms: {
      measure_evolution: number,
    },
    circumferenceWaist: {
      measure_evolution: number,
    },
    circumferenceHips: {
      measure_evolution: number,
    },
    circumferenceGlutes: {
      measure_evolution: number,
    },
    circumferenceQuads: {
      measure_evolution: number,
    },
    circumferenceCalf: {
      measure_evolution: number,
    },
  }
}

export interface BodySectionProps {
  lastMeasure: any,
  evolution?: Evolution,
};