import { create } from "zustand";
import { Owner, ResponseDTO } from "../utils/types";
import api from "../api/config";

type OwnerState = {
  loading: boolean;
  ownerResponse: ResponseDTO<Owner>;
  saveOwner: (data: Owner) => Promise<void>;
};
const useOwnerStore = create<OwnerState>((set) => ({
  loading: false,
  ownerResponse: {},
  async saveOwner(data) {
    try {
      set((state) => ({ ...state, loading: true }));
      const response = await api.post<ResponseDTO<Owner>>(`/owners`, data);
      console.log(response.data);
      set((state) => ({
        ...state,
        loading: false,
        ownerResponse: response.data,
      }));
    } catch (error: any) {
      console.log(error);
      set((state) => ({
        ...state,
        loading: false,
        ownerResponse: { success: false, message: error.message },
      }));
    }
  },
}));

export default useOwnerStore;
