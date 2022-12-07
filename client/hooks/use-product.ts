import { ListResponse, Product } from "@/interfaces/index";
import { ProductApi } from "@/services/product-api";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import useSWR from "swr";
export const useProducts = (
  page?: number,
  search?: string,
  categoryType?: string,
  price?: string,
  createdAt?: string
) => {
  let url = `/products`;
  if (search) {
    url = `${url}?search=${search}&page=${page || 1}`;
  } else if (categoryType) {
    url = `${url}?categoryType=${categoryType}&page=${page || 1}`;
  } else {
    url = `${url}?page=${page || 1}`;
  }
  if (price) url += `&price=${price}`;
  if (createdAt) url += `&createdAt=${createdAt}`;

  const { data, mutate, isValidating, error } = useSWR<
    ListResponse<Product[] | null>
  >(url, {
    dedupingInterval: 3000,
    // revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnMount: true,
  });

  const addProduct = async (dataProduct: Product) => {
    let err = "";
    try {
      const { message } = await ProductApi.addProduct(dataProduct);
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
    products: data?.data,
    pagination: data?.pagination,
    isValidating,
    error,
    addProduct,
  };
};

export const useProduct = (id?: string) => {
  const router = useRouter();
  const { data, mutate, isValidating, error } = useSWR<
    ListResponse<Product | null>
  >(id ? `/products/${id}` : null, {
    dedupingInterval: 5000,
    revalidateOnFocus: false,
  });

  const updateProduct = async (dataProduct: Product) => {
    try {
      const { message } = await ProductApi.updateProduct({
        _id: id,
        ...dataProduct,
      });
      toast.success(message);

      mutate();
    } catch (error: any) {
      //console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { message } = await ProductApi.deleteProduct(id);
      toast.success(message);
      mutate();
      router.push("/admin/products");
    } catch (error: any) {
      //console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return {
    mutate,
    product: data?.data,
    pagination: data?.pagination,
    isValidating,
    error,
    updateProduct,
    deleteProduct,
  };
};
