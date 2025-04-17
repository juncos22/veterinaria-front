import { create } from "zustand";
import { AuthResponse, LoginUserDTO } from "../utils/types";
import api from "../api/config";

type AuthState = {
  loading: boolean;
  error?: string;
  authenticated: boolean;
  authResponse: AuthResponse;
  login: (form: LoginUserDTO) => Promise<void>;
  signOut: () => Promise<void>;
};

const useAuthStore = create<AuthState>((set) => ({
  loading: false,
  authenticated: false,
  authResponse: {},
  async login(form) {
    try {
      set((state) => ({ ...state, loading: true }));
      const response = await api.post<AuthResponse>(`/users/login`, form);
      console.log("Auth Response:", response.data);
      localStorage.setItem("auth", JSON.stringify(response.data));

      set((state) => ({
        ...state,
        loading: false,
        authenticated: true,
        authResponse: response.data,
      }));
    } catch (error: any) {
      console.log("Auth error:", error);
      set((state) => ({ ...state, loading: false, error: error.message }));
    }
  },
  async signOut() {},
}));

export default useAuthStore;
