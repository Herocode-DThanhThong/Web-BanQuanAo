import { Carts, ListResponse, SelectedProduct } from "@/interfaces/index";
import { CartsApi } from "@/services/carts-api";
import { UserApi } from "@/services/users-api";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import { useAuth } from "./use-user";

export const useCart = () => {
  const { profile } = useAuth();
  const {
    data: cart,
    mutate,
    isValidating,
    error,
  } = useSWR<ListResponse<Carts | null>>("/carts", {
    // dedupingInterval: 2000,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnMount: true,
  });

  useEffect(() => {
    if (!profile) {
      mutate(
        {
          data: null,
          message: "Bạn chưa đăng nhập",
        },
        false
      );
    }

    mutate();
  }, [profile]);

  const updateCart = async (dataSelectedProduct: SelectedProduct) => {
    try {
      let newCarts: SelectedProduct[] = [];

      if (!cart || !cart.data) {
        newCarts.push(dataSelectedProduct);
      } else {
        if (cart.data.productCart.length !== 0) {
          let isSameSizeAndId = false;
          newCarts = cart.data.productCart.map((item, idx) => {
            if (
              item.size === dataSelectedProduct.size &&
              item._id === dataSelectedProduct._id
            ) {
              isSameSizeAndId = true;
              return {
                ...item,
                quantity: item.quantity + dataSelectedProduct.quantity,
              };
            }
            return item;
          });

          if (!isSameSizeAndId) {
            newCarts.push(dataSelectedProduct);
          }
        } else {
          newCarts.push(dataSelectedProduct);
        }
      }

      const { message } = await CartsApi.updateCart(newCarts);

      mutate();
    } catch (error: any) {
      //console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const deleteProductInCart = async (dataSelectedProduct: SelectedProduct) => {
    try {
      let newCarts: SelectedProduct[] = [];

      if (!cart || !cart.data) {
        return;
      } else {
        newCarts = cart.data.productCart.filter(
          (item, idx) =>
            !(
              item.size === dataSelectedProduct.size &&
              item._id === dataSelectedProduct._id
            )
        );
      }

      const { message } = await CartsApi.updateCart(newCarts);
      toast.success(message);
      mutate();
    } catch (error: any) {
      //console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const orderProduct = async () => {
    try {
      if (cart?.data?.productCart) {
        // Add Receipt
        const { message } = await UserApi.orderProduct(cart.data.productCart);

        // Clear cart
        await CartsApi.updateCart([]);

        toast.success(message);
        mutate();
      }
    } catch (error: any) {
      //console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return {
    mutate,
    cart: cart?.data,
    isValidating,
    error,
    updateCart,
    deleteProductInCart,
    orderProduct,
  };
};
