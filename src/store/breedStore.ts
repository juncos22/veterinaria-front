import { create } from "zustand";
import api from "../api/config";
import { Breed, ResponseDTO } from "../utils/types";

type BreedState = {
  loading: boolean;
  breedResponse: ResponseDTO<Breed>;
  saveBreed: (data: string) => Promise<void>;
};

const useBreedStore = create<BreedState>((set) => ({
  loading: false,
  breedResponse: {},
  async saveBreed(data) {
    try {
      set((state) => ({ ...state, loading: true }));
      const response = await api.post<ResponseDTO<Breed>>(`/breeds`, {
        name: data,
      });

      set((state) => ({
        ...state,
        loading: false,
        breedResponse: response.data,
      }));
    } catch (error: any) {
      console.log(error);
      set((state) => ({
        ...state,
        loading: false,
        breedResponse: { success: false, message: error.message },
      }));
    }
  },
}));

export default useBreedStore;
