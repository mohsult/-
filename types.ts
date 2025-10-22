
export enum VisualCondition {
  Amblyopia = "كسل العين (Amblyopia)",
  Strabismus = "الحَوَل (Strabismus)",
  Astigmatism = "الاستجماتزم (Astigmatism)",
  Myopia = "قِصر النظر (Myopia)",
  Hyperopia = "طول النظر (Hyperopia)",
  ConvergenceInsufficiency = "ضعف التوافق البصري",
  VisualPerceptionDisorder = "ضعف الإدراك البصري",
  TrackingDifficulty = "صعوبة تتبع الأجسام",
}

export interface UserProfile {
  name: string;
  age: number;
  condition: VisualCondition;
  duration: 15 | 30 | 60;
}

export enum ActivityType {
  Puzzle = "ألعاب Puzzle بصرية",
  EyeTracking = "تمارين تتبع بصري",
  Coloring = "صفحات تلوين علاجية",
  FocusGame = "ألعاب رؤية مجسّمة",
  Relaxation = "تمارين استرخاء",
}

export interface Activity {
  type: ActivityType;
  title: string;
  description: string;
  duration: number; // in minutes
}

export interface ColoringActivity extends Activity {
  coloringThemes: string[];
}

export interface DailySession {
  day: number;
  activities: (Activity | ColoringActivity)[];
}

export interface TherapyPlan {
  sessions: DailySession[];
}
