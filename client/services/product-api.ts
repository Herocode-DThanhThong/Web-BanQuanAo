import { ListResponse, Product } from "@/interfaces/index";
import axiosInstance from "@/utils/axiosInstance";

export const ProductApi = {
  addProduct: async (payload: Product): Promise<ListResponse<Product>> => {
    // Call api
    const results: ListResponse<Product> = await axiosInstance.post(
      `/products`,
      payload
    );
    return results;
  },

  getDetailProduct: async (id: string): Promise<ListResponse<Product>> => {
    // Call api
    const results: ListResponse<Product> = await axiosInstance.get(
      `/products/${id}`
    );
    return results;
  },

  updateProduct: async (payload: Product): Promise<ListResponse<Product>> => {
    const id = payload._id;

    // Don't send _id to server because don't need upadte _id
    delete payload._id;

    // Call api
    const results: ListResponse<Product> = await axiosInstance.patch(
      `/products/${id}`,
      payload
    );
    return results;
  },

  deleteProduct: async (id: string): Promise<ListResponse<Product>> => {
    // Call api
    const results: ListResponse<Product> = await axiosInstance.delete(
      `/products/${id}`
    );
    return results;
  },
};
