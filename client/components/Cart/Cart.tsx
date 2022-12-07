import { useCart } from "@/hooks/use-carts";
import { useAuth } from "@/hooks/use-user";
import { formatPrice } from "@/utils/formatPrice";
import { getDefaultAddress } from "@/utils/getDefaultAddress";
import Image from "next/image";
import React, { useMemo } from "react";

const Cart = () => {
  const { cart, deleteProductInCart, orderProduct } = useCart();
  const { profile } = useAuth();
  const totalMoney = useMemo(() => {
    const result = cart?.productCart.reduce((res, curentPro, index) => {
      return res + curentPro.price * curentPro.quantity;
    }, 0);
    return result;
  }, [cart]);
  return (
    <div className="absolute  w-[450px] py-3 px-4 right-0 rounded-md shadow-md border-2 bg-white top-full z-10">
      <p className="py-2 text-center text-base bg-gray-100 text-gray-600 font-semibold text-[18px]">
        Giỏ hàng
      </p>

      {cart?.productCart ? (
        <>
          <div className="mt-4 h-[300px] overflow-scroll">
            {cart.productCart.map((item, idx) => (
              <div key={item._id} className="flex gap-2 items-center">
                <div className="">
                  <Image
                    width={500}
                    height={500}
                    priority
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                    src={item.images[0].url}
                    alt=""
                    className="img-thumbnail rounded"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-sm">
                      {item.title.length > 30
                        ? item.title.slice(0, 30) + "..."
                        : item.title}
                    </p>
                    <button
                      onClick={() => {
                        deleteProductInCart(item);
                      }}
                      className="p-1 rounded-sm bg-gray-400"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 text-white font-bold"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm my-2">
                    <span className="font-semibold text-sm">Size:</span>{" "}
                    {item.size}
                  </p>
                  <p className="text-sm my-2">
                    <span className="font-semibold text-sm">Số lượng:</span>{" "}
                    {item.quantity}
                  </p>
                  <p className="text-sm my-2">
                    <span className="font-semibold text-sm">Giá:</span>{" "}
                    {formatPrice(item.quantity * item.price)} đ
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mb-4 flex items-center gap-2">
            <span className="text-gray-800 font-semibold">Tổng tiền: </span>
            <span className="text-xl text-red-600">
              {formatPrice(totalMoney ? totalMoney : 0)} đ
            </span>
          </p>

          <button
            disabled={!cart || cart.productCart.length === 0}
            onClick={() => {
              if (window.confirm("Bạn chắc chắn muốn đặt hàng?")) {
                if (profile?.addressList) {
                  if (!getDefaultAddress(profile.addressList))
                    return alert("Vui lòng thêm địa chỉ người nhận");
                } else {
                  return "Vui lòng đăng nhập";
                }

                orderProduct();
              }
            }}
            className="b hover:opacity-80 rounded-sm bg-gray-100 border-2 block mx-auto w-full"
          >
            <p className="py-2 text-center text-base  text-gray-600 font-semibold text-[18px]">
              Đặt hàng
            </p>
          </button>
        </>
      ) : (
        <div className="my-4">
          <h1 className="text-center">Bạn chưa có sản phẩm trong giỏ hàng</h1>
        </div>
      )}
    </div>
  );
};

export default Cart;
