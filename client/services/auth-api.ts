import { ListResponse } from "./../interfaces/index";
import { User } from "@/interfaces/index";
import axiosInstance from "@/utils/axiosInstance";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const AuthApi = {
  register: async (payload: User): Promise<ListResponse<User>> => {
    const results: ListResponse<User> = await axiosInstance.post(
      "/auth/register",
      payload
    );
    return results;
  },

  login: async (
    payload: LoginPayload
  ): Promise<ListResponse<LoginResponse>> => {
    const results: ListResponse<LoginResponse> = await axiosInstance.post(
      "/auth/login",
      payload
    );
    return results;
  },

  getProfile: async () => {},
};
