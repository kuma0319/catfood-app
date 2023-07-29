import { MinimumUserInfo } from "./user";

interface AverageScore {
  id: number;
  name: string;
  value: number;
}

interface Evaluation {
  id: number;
  review_item: {
    id: number;
    name: string;
  };
  score: number;
}

export interface Review {
  id: number;
  title: string;
  content: string;
  created_at: string;
  evaluations: Evaluation[];
  food_id: number;
  updated_at: string;
  user: MinimumUserInfo;
}

export interface ReviewData {
  average_scores: AverageScore[];
  reviews: Review[];
}

export interface ReviewInput {
  title: string;
  content: string;
  rateOfEating: number;
  rateOfFur: number;
  rateOfHealth: number;
  rateOfScent: number;
}
