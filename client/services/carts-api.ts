import { Carts, ListResponse, SelectedProduct } from "@/interfaces/index";
import axiosInstance from "@/utils/axiosInstance";

export const CartsApi = {
  updateCart: async (
    payload: SelectedProduct[]
  ): Promise<ListResponse<Carts>> => {
    // Call api

    const results: ListResponse<Carts> = await axiosInstance.patch(`/carts`, {
      productCart: payload,
    });
    return results;
  },
};
