import { create } from "zustand";
import {
  AuthResponse,
  LoginUserDTO,
  RegisterUserDTO,
  ResponseDTO,
} from "../utils/types";
import api from "../api/config";

type AuthState = {
  loading: boolean;
  authenticated: boolean;
  authResponse: ResponseDTO<AuthResponse>;
  login: (form: LoginUserDTO) => Promise<void>;
  register: (form: RegisterUserDTO) => Promise<void>;
  signOut: () => Promise<void>;
};

const useAuthStore = create<AuthState>((set) => ({
  loading: false,
  authenticated: localStorage.getItem("auth") !== null,
  authResponse:
    localStorage.getItem("auth") !== null
      ? {
          success: true,
          data: JSON.parse(localStorage.getItem("auth")!) as AuthResponse,
        }
      : {},
  async login(form) {
    try {
      set((state) => ({ ...state, loading: true }));
      const response = await api.post<ResponseDTO<AuthResponse>>(
        `/users/login`,
        form
      );
      console.log("Auth Response:", response.data);
      if (response.data.success) {
        localStorage.setItem(
          "auth",
          JSON.stringify(response.data.data as AuthResponse)
        );
      }
      set((state) => ({
        ...state,
        loading: false,
        authenticated: localStorage.getItem("auth") !== null,
        authResponse: response.data,
      }));
    } catch (error: any) {
      console.log("Auth error:", error);
      set((state) => ({
        ...state,
        loading: false,
        authResponse: { success: false, message: error.message },
      }));
    }
  },
  async register(form) {
    try {
      set((state) => ({ ...state, loading: true }));
      const response = await api.post<ResponseDTO<AuthResponse>>(
        `/users/register`,
        form
      );
      localStorage.setItem(
        "auth",
        JSON.stringify(response.data.data as AuthResponse)
      );
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
