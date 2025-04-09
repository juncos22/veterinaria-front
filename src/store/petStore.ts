import { create } from "zustand";
import { Breed, CreatePetDTO, Pet, PetList } from "../utils/types";
import api from "../api/config";

type PetState = {
  pets: PetList[];
  pet?: PetList;
  breeds: Breed[];
  error?: string;
  loading: boolean;
  message?: string;
  getPetBreeds: () => Promise<void>;
  getAllPets: (data?: string) => Promise<void>;
  savePet: (data: CreatePetDTO) => Promise<void>;
  getOnePet: (id: number) => Promise<void>;
};

const usePetStore = create<PetState>((set) => ({
  pets: [],
  breeds: [],
  loading: false,
  async getPetBreeds() {
    try {
      const response = await api.get<Breed[]>(`/breeds`);
      set((state) => ({ ...state, breeds: response.data }));
    } catch (error: any) {
      console.log(error);
    }
  },
  async getAllPets(data) {
    try {
      set((state) => ({ ...state, loading: true }));
      let params = data ? `?q=${data}` : "";
      const response = await api.get<PetList[]>(`/pets${params}`);
      // console.log(response.data);
      set((state) => ({ ...state, pets: response.data, loading: false }));
    } catch (error: any) {
      console.log("PetStore -> GetAllPets Error:", error);
      set((state) => ({ ...state, error: error.message, loading: false }));
    }
  },
  async savePet(data) {
    try {
      set((state) => ({ ...state, loading: true }));
      const response = await api.post<Pet>("/pets", data);
      set((state) => ({
        ...state,
        loading: false,
        message: response.data.id
          ? "Mascota registrada con exito!"
          : "No se pudo registrar tu mascota!",
      }));
      setTimeout(() => {
        set((state) => ({ ...state, message: undefined }));
      }, 5000);
    } catch (error: any) {
      console.log(error);
      console.log("PetStore -> SavePet Error:", error);
      set((state) => ({ ...state, error: error.message, loading: false }));
      setTimeout(() => {
        set((state) => ({ ...state, error: undefined }));
      }, 5000);
    }
  },
  async getOnePet(id) {
    try {
      set((state) => ({ ...state, loading: true }));
      const response = await api.get<PetList[]>(`/pets/${id}`);
      const { data } = await api.get(
        `/medications?petName=${response.data[0].pet}`
      );
      set((state) => ({
        ...state,
        loading: false,
        pet: { ...response.data[0], medications: data.map((m: any) => m.name) },
      }));
    } catch (error: any) {
      console.log(error);
      set((state) => ({ ...state, error: error.message, loading: false }));
    }
  },
}));

export default usePetStore;
