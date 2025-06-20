import { create } from "zustand";
import {
  Breed,
  CreatePetDTO,
  Owner,
  PetList,
  ResponseDTO,
  UpdatePetDTO,
} from "../utils/types";
import api from "../api/config";

type PetState = {
  petResponse: ResponseDTO<PetList | CreatePetDTO | UpdatePetDTO>;
  petDetail?: PetList;
  breedResponse: ResponseDTO<Breed>;
  ownerResponse: ResponseDTO<Owner>;
  loading: boolean;
  getPetBreeds: () => Promise<void>;
  getPetOwners: () => Promise<void>;
  getAllPets: (data?: string) => Promise<void>;
  savePet: (data: CreatePetDTO) => Promise<void>;
  getOnePet: (id: number) => Promise<void>;
  deletePet: (id: number) => Promise<void>;
  updatePet: (pet: UpdatePetDTO) => Promise<void>;
};

const usePetStore = create<PetState>((set) => ({
  petResponse: {},
  breedResponse: {},
  ownerResponse: {},
  loading: false,
  async getPetBreeds() {
    try {
      const response = await api.get<ResponseDTO<Breed>>(`/breeds`);
      set((state) => ({ ...state, breedResponse: response.data }));
    } catch (error: any) {
      console.log(error.message);
      set((state) => ({
        ...state,
        breedResponse: { success: false, message: error.message },
      }));
    }
  },
  async getPetOwners() {
    try {
      const response = await api.get<ResponseDTO<Owner>>("/owners");
      set((state) => ({ ...state, ownerResponse: response.data }));
    } catch (error: any) {
      console.log(error.message);
      set((state) => ({
        ...state,
        ownerResponse: { success: false, message: error.message },
      }));
    }
  },
  async getAllPets(data) {
    try {
      set((state) => ({ ...state, loading: true }));
      const params = data ? `?q=${data}` : "";
      const response = await api.get<ResponseDTO<PetList>>(`/pets${params}`);
      set((state) => ({
        ...state,
        petResponse: response.data,
        loading: false,
      }));
    } catch (error: any) {
      console.log("PetStore -> GetAllPets Error:", error);
      set((state) => ({
        ...state,
        loading: false,
        petResponse: {
          success: false,
          message: error.message,
        },
      }));
    }
  },
  async savePet(data) {
    try {
      set((state) => ({ ...state, loading: true }));
      // console.log(data);
      const response = await api.post<ResponseDTO<CreatePetDTO>>("/pets", data);
      set((state) => ({
        ...state,
        loading: false,
        petResponse: response.data,
      }));
      setTimeout(() => {
        set((state) => ({ ...state, petResponse: {} }));
      }, 5000);
    } catch (error: any) {
      console.log("PetStore -> SavePet Error:", error);
      set((state) => ({
        ...state,
        loading: false,
        petResponse: {
          success: false,
          message: error.message,
        },
      }));
      setTimeout(() => {
        set((state) => ({ ...state, petResponse: {} }));
      }, 5000);
    }
  },
  async getOnePet(id) {
    try {
      set((state) => ({ ...state, loading: true }));
      const response = await api.get<ResponseDTO<PetList>>(`/pets/${id}`);
      console.log("Data:", response.data);
      set((state) => ({
        ...state,
        loading: false,
        petDetail: response.data.data as PetList,
      }));
    } catch (error: any) {
      console.log(error);
      set((state) => ({
        ...state,
        loading: false,
        petResponse: {
          success: false,
          message: error.message,
        },
      }));
    }
  },
  async deletePet(id) {
    try {
      const response = await api.delete<ResponseDTO<CreatePetDTO>>(
        `/pets/${id}`
      );
      console.log("Delete response:", response.data);
      set((state) => ({ ...state, petResponse: response.data }));
      setTimeout(() => {
        set((state) => ({
          ...state,
          petResponse: { ...response.data, message: "" },
        }));
      }, 3000);
    } catch (error: any) {
      console.log(error);
      set((state) => ({
        ...state,
        petResponse: { success: false, message: error.message },
      }));
    }
  },
  async updatePet(petData) {
    try {
      set((state) => ({ ...state, loading: true }));
      const { id, ...rest } = petData;
      const response = await api.put<ResponseDTO<UpdatePetDTO>>(
        `/pets/${id}`,
        rest
      );
      console.log("Update response:", response.data);
      set((state) => ({
        ...state,
        loading: false,
        petResponse: response.data,
      }));
    } catch (error: any) {
      console.log(error);
      set((state) => ({
        ...state,
        loading: false,
        petResponse: {
          success: false,
          message: error.message,
        },
      }));
    }
  },
}));

export default usePetStore;
