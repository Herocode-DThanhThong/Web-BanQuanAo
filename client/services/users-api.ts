import { ListResponse, Receipt, SelectedProduct } from "@/interfaces/index";
import { User } from "@/interfaces/index";
import axiosInstance from "@/utils/axiosInstance";

export const UserApi = {
  editProfile: async (payload: Partial<User>): Promise<ListResponse<User>> => {
    const id = payload._id;

    // Don't send _id to server because don't need upadte _id
    delete payload._id;

    // Call api
    const results: ListResponse<User> = await axiosInstance.patch(
      `/profile/${id}`,
      payload
    );
    return results;
  },

  orderProduct: async (
    payload: SelectedProduct[]
  ): Promise<ListResponse<Receipt>> => {
    // Call api
    const results: ListResponse<Receipt> = await axiosInstance.post(
      `/receipt`,
      { productCart: payload }
    );
    return results;
  },
};
