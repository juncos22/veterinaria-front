import { create } from "zustand";
import { CreateMedicationDTO } from "../utils/types";
import api from "../api/config";

type MedicationState = {
  data?: CreateMedicationDTO;
  loading: boolean;
  error?: string;
  message?: string;
  saveMedication: (data: CreateMedicationDTO) => Promise<void>;
};
const useMedicationStore = create<MedicationState>((set) => ({
  loading: false,
  async saveMedication(data) {
    try {
      set((state) => ({ ...state, loading: true }));
      const response = await api.post(`/medications`, data);
      console.log(response.data);
      set((state) => ({
        ...state,
        loading: false,
        message: "Medicación guardada exitosamente",
      }));
    } catch (error: any) {
      console.log(error);
      set((state) => ({
        ...state,
        loading: false,
        error: error.message,
      }));
    }
  },
}));

export default useMedicationStore;
