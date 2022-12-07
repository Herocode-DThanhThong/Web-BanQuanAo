import { CategoryApi } from "@/services/category-api";
import { Category, ListResponse } from "@/interfaces/index";
import useSWR from "swr";
import { toast } from "react-toastify";

export const useCategory = () => {
  const {
    data: categories,
    mutate,
    isValidating,
    error,
  } = useSWR<ListResponse<Category[] | null>>("/category", {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnMount: true,
  });

  const addCategory = async (categoryData: Category) => {
    let err = "";
    try {
      const { message } = await CategoryApi.addCategory(categoryData);
      toast.success(message);
      mutate();
    } catch (error: any) {
      //console.log(error);
      err = error.response.data.message;
      toast.error(error.response.data.message);
    }
    return err;
  };

  const updateCategory = async (categoryData: Category) => {
    try {
      const { message } = await CategoryApi.updateCategory(categoryData);
      toast.success(message);

      mutate();
    } catch (error: any) {
      //console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const deleteCategory = async (id: string) => {
    let err = "";
    try {
      const { message } = await CategoryApi.deleteCategory(id);
      toast.success(message);
      mutate();
    } catch (error: any) {
      //console.log(error);
      err = error.response.data.message;
      toast.error(error.response.data.message);
    }
    return err;
  };

  return {
    mutate,
    categories: categories?.data,
    isValidating,
    error,
    addCategory,
    updateCategory,
    deleteCategory,
  };
};
