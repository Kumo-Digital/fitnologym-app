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

export interface EvolutionValue {
  percentage: number;
  specific: number | null;
}

export interface Evolution {
  user_id: string;
  metrics: {
    weight: {
      measure_evolution: EvolutionValue;
    };
    bmi: {
      measure_evolution: EvolutionValue;
    };
    body_fat: {
      measure_evolution: EvolutionValue;
    };
    visc_fat: {
      measure_evolution: EvolutionValue;
    };
    muscle_mass: {
      measure_evolution: EvolutionValue;
    };
    muscle_quality: {
      measure_evolution: EvolutionValue;
    };
    bone_mass: {
      measure_evolution: EvolutionValue;
    };
    bmr: {
      measure_evolution: EvolutionValue;
    };
    metab_age: {
      measure_evolution: EvolutionValue;
    };
    body_water: {
      measure_evolution: EvolutionValue;
    };
    physique_rating: {
      measure_evolution: EvolutionValue;
    };
    ffmi: {
      measure_evolution: EvolutionValue;
    };
    left_arm: {
      muscle_mass: {
        measure_evolution: EvolutionValue;
      };
      body_fat: {
        measure_evolution: EvolutionValue;
      };
      muscle_quality: {
        measure_evolution: EvolutionValue;
      };
    };
    right_arm: {
      muscle_mass: {
        measure_evolution: EvolutionValue;
      };
      body_fat: {
        measure_evolution: EvolutionValue;
      };
      muscle_quality: {
        measure_evolution: EvolutionValue;
      };
    };
    left_leg: {
      muscle_mass: {
        measure_evolution: EvolutionValue;
      };
      body_fat: {
        measure_evolution: EvolutionValue;
      };
      muscle_quality: {
        measure_evolution: EvolutionValue;
      };
    };
    right_leg: {
      muscle_mass: {
        measure_evolution: EvolutionValue;
      };
      body_fat: {
        measure_evolution: EvolutionValue;
      };
      muscle_quality: {
        measure_evolution: EvolutionValue;
      };
    };
    trunk: {
      muscle_mass: {
        measure_evolution: EvolutionValue;
      };
      body_fat: {
        measure_evolution: EvolutionValue;
      };
    };
    circumferenceNeck: {
      measure_evolution: EvolutionValue;
    };
    circumferenceChest: {
      measure_evolution: EvolutionValue;
    };
    circumferenceWaist: {
      measure_evolution: EvolutionValue;
    };
    circumferenceHips: {
      measure_evolution: EvolutionValue;
    };
    circumferenceGlutes: {
      measure_evolution: EvolutionValue;
    };
    circumferenceShoulders: {
      measure_evolution: EvolutionValue;
    };
    circumferenceArmsLeft: {
      measure_evolution: EvolutionValue;
    };
    circumferenceArmsRight: {
      measure_evolution: EvolutionValue;
    };
    circumferenceFlexedArmsLeft: {
      measure_evolution: EvolutionValue;
    };
    circumferenceFlexedArmsRight: {
      measure_evolution: EvolutionValue;
    };
    circumferenceQuadsLeft: {
      measure_evolution: EvolutionValue;
    };
    circumferenceQuadsRight: {
      measure_evolution: EvolutionValue;
    };
    circumferenceCalfLeft: {
      measure_evolution: EvolutionValue;
    };
    circumferenceCalfRight: {
      measure_evolution: EvolutionValue;
    };
  };
}

export interface BodySectionProps {
  lastMeasure: any;
  evolution?: Record<string, any>;
  targetMeasure?: any;
  isEvolutionFromFirstToLast: boolean;
  handleToggle: () => void;
  showSwitch: boolean;
}
