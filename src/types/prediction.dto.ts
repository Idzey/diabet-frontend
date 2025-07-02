import type { ModelType } from "./models";

export interface PredictionDto {
  "patient_data": {
    "pregnancies": number,
    "glucose": number,
    "blood_pressure": number,
    "skin_thickness": number,
    "insulin": number,
    "bmi": number,
    "diabetes_pedigree": number,
    "age": number,
  },
  "model_type": ModelType,
}