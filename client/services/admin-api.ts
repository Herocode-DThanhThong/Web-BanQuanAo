import { ListResponse, Receipt } from "@/interfaces/index";
import { User } from "@/interfaces/index";
import axiosClient from "@/utils/axiosInstance";

export const AdminApi = {
  getAllUser: async (): Promise<ListResponse<User[]>> => {
    const results: ListResponse<User[]> = await axiosClient.get("/admin/users");
    return results;
  },

  addEmployee: async (id: string): Promise<ListResponse<User>> => {
    const results: ListResponse<User> = await axiosClient.patch(
      "/admin/users/" + id
    );
    return results;
  },

  deleteUser: async (id: string): Promise<ListResponse<User>> => {
    const results: ListResponse<User> = await axiosClient.delete(
      "/admin/users/" + id
    );
    return results;
  },

  confirmReceipt: async (id: string): Promise<ListResponse<Receipt>> => {
    const results: ListResponse<Receipt> = await axiosClient.patch(
      "/receipt/" + id
    );
    return results;
  },
};
