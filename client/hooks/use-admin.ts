import { AdminApi } from "./../services/admin-api";
import { ListResponse, User } from "@/interfaces/index";
import useSWR from "swr";
import { toast } from "react-toastify";

export const useAdmin = () => {
  const {
    data: users,
    mutate,
    isValidating,
    error,
  } = useSWR<ListResponse<User[] | null>>("/admin/users", {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnMount: true,
  });

  const addEmployee = async (id: string) => {
    try {
      const { message } = await AdminApi.addEmployee(id);
      toast.success(message);

      mutate();
    } catch (error: any) {
      //console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const { message } = await AdminApi.deleteUser(id);
      toast.success(message);
      mutate();
    } catch (error: any) {
      //console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return {
    mutate,
    users: users?.data,
    isValidating,
    error,
    addEmployee,
    deleteUser,
  };
};
