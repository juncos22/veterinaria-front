import { create } from "zustand";
import { CreateMedicationDTO, ResponseDTO } from "../utils/types";
import api from "../api/config";

type MedicationState = {
  loading: boolean;
  medicationResponse: ResponseDTO<CreateMedicationDTO>;
  saveMedication: (data: CreateMedicationDTO) => Promise<void>;
};
const useMedicationStore = create<MedicationState>((set) => ({
  loading: false,
  medicationResponse: {},
  async saveMedication(data) {
    try {
      set((state) => ({ ...state, loading: true }));
      const response = await api.post<ResponseDTO<CreateMedicationDTO>>(
        `/medications`,
        data
      );
      console.log(response.data);
      set((state) => ({
        ...state,
        loading: false,
        medicationResponse: response.data,
      }));
      setTimeout(() => {
        set((state) => ({
          ...state,
          medicationResponse: {},
        }));
      }, 3000);
    } catch (error: any) {
      console.log(error);
      set((state) => ({
        ...state,
        loading: false,
        medicationResponse: { success: false, message: error.message },
      }));
    }
  },
}));

export default useMedicationStore;
