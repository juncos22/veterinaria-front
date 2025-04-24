import { create } from "zustand";
import { Owner } from "../utils/types";
import api from "../api/config";

type OwnerState = {
  loading: boolean;
  error?: string;
  message?: string;
  saveOwner: (data: Owner) => Promise<void>;
};
const useOwnerStore = create<OwnerState>((set) => ({
  loading: false,
  async saveOwner(data) {
    try {
      set((state) => ({ ...state, loading: true }));
      const response = await api.post(`/owners`, data);
      console.log(response.data);
      set((state) => ({
        ...state,
        loading: false,
        message: response.data.message,
      }));
    } catch (error: any) {
      console.log(error);
      set((state) => ({ ...state, error: error.message, loading: false }));
    }
  },
}));

export default useOwnerStore;
