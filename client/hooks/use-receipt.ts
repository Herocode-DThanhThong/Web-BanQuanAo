import { ListResponse, Receipt, SelectedProduct } from "@/interfaces/index";
import { AdminApi } from "@/services/admin-api";
import { toast } from "react-toastify";
import useSWR from "swr";

export const useReceipt = () => {
  const {
    data: receipts,
    mutate,
    isValidating,
    error,
  } = useSWR<ListResponse<Receipt[] | null>>("/receipt", {
    revalidateOnFocus: true,
    revalidateOnMount: true,
  });

  const updateReceipt = async (id: string) => {
    try {
      const { message } = await AdminApi.confirmReceipt(id);
      toast.success(message);
      mutate();
    } catch (error: any) {
      //console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return {
    mutate,
    receipts: receipts?.data,
    isValidating,
    error,
    updateReceipt,
  };
};
