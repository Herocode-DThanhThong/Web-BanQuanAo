import { Category, ListResponse } from "@/interfaces/index";
import axiosInstance from "@/utils/axiosInstance";

export const CategoryApi = {
  addCategory: async (payload: Category): Promise<ListResponse<Category>> => {
    // Call api
    const results: ListResponse<Category> = await axiosInstance.post(
      `/category`,
      payload
    );
    return results;
  },
  updateCategory: async (
    payload: Category
  ): Promise<ListResponse<Category>> => {
    const id = payload._id;

    // Don't send _id to server because don't need upadte _id
    delete payload._id;

    // Call api
    const results: ListResponse<Category> = await axiosInstance.patch(
      `/category/${id}`,
      payload
    );
    return results;
  },

  deleteCategory: async (id: string): Promise<ListResponse<Category>> => {
    // Call api
    const results: ListResponse<Category> = await axiosInstance.delete(
      `/category/${id}`
    );
    return results;
  },
};
