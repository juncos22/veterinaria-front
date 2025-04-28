import { create } from "zustand";
import api from "../api/config";

type BreedState = {
  loading: boolean;
  error?: string;
  message?: string;
  saveBreed: (data: string) => Promise<void>;
};

const useBreedStore = create<BreedState>((set) => ({
  loading: false,
  async saveBreed(data) {
    try {
      set((state) => ({ ...state, loading: true }));
      const response = await api.post(`/breeds`, { name: data });

      set((state) => ({ ...state, loading: false, message: response.data }));
    } catch (error: any) {
      console.log(error);
      set((state) => ({ ...state, loading: false, error: error.message }));
    }
  },
}));

export default useBreedStore;
