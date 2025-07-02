export interface PredictionResult {
  confidence: number;
  model_used: string;
  patient_id: string;
  prediction: number;
  probability_diabetes: number;
  risk_level: string;
}