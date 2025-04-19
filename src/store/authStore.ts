import { create } from "zustand";
import { AuthResponse, LoginUserDTO, RegisterUserDTO } from "../utils/types";
import api from "../api/config";

type AuthState = {
  loading: boolean;
  error?: string;
  authenticated: boolean;
  authResponse: AuthResponse;
  login: (form: LoginUserDTO) => Promise<void>;
  register: (form: RegisterUserDTO) => Promise<void>;
  signOut: () => Promise<void>;
};

const useAuthStore = create<AuthState>((set) => ({
  loading: false,
  authenticated: localStorage.getItem("auth") !== null,
  authResponse: localStorage.getItem("auth")
    ? (JSON.parse(localStorage.getItem("auth")!) as AuthResponse)
    : {},
  async login(form) {
    try {
      set((state) => ({ ...state, loading: true }));
      const response = await api.post<AuthResponse>(`/users/login`, form);
      // console.log("Auth Response:", response.data);
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
  async register(form) {
    try {
      set((state) => ({ ...state, loading: true }));
      const response = await api.post<AuthResponse>(`/users/register`, form);
      localStorage.setItem("auth", JSON.stringify(response.data));
      set((state) => ({
        ...state,
        loading: false,
        authResponse: response.data,
        authenticated: true,
      }));
    } catch (error: any) {
      console.log("Register error:", error);
      set((state) => ({ ...state, error: error.message, loading: false }));
    }
  },
  async signOut() {
    try {
      localStorage.removeItem("auth");
      set((state) => ({
        ...state,
        authenticated: localStorage.getItem("auth") !== null,
      }));
    } catch (error: any) {
      console.log(error);
      set((state) => ({ ...state, loading: false, error: error.message }));
    }
  },
}));

export default useAuthStore;
