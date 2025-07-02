import type { PredictionDto } from "@/types/prediction.dto";
import axios from "axios";

export const DiabetService = {
    async getPrediction(data: PredictionDto) {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/predict`, data);

            if (!response || !response.data) {
                throw new Error("No data received from the server");
            }

            return response.data;
        } catch (error) {
            console.error("Error fetching prediction:", error);
            throw error;
        }
    },

    async getPredictionWithRecomendation(data: PredictionDto) {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/predict-with-recomendation`, data);
            if (!response || !response.data) {
                throw new Error("No data received from the server");
            }
            return response.data;
        } catch (error) {
            console.error("Error fetching prediction with recommendation:", error);
            throw error;
        }
    }
}