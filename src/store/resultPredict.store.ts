import type { PredictionResult } from '@/types/prediction-result';
import { create } from 'zustand'

interface ResultPredictState {
    result: PredictionResult | null;
    open: boolean;
    setResult: (result: PredictionResult | null) => void;
    setOpen: (open: boolean) => void;
};

export const useResultPredictStore = create<ResultPredictState>((set => ({
    result: null,
    open: false,
    setResult: (result) => set(() => ({ result })),
    setOpen: (open: boolean) => set(() => ({ open })),
})));