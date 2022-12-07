import Navigation from "@/components/Navigation";
import { useCart } from "@/hooks/use-carts";
import { useProduct } from "@/hooks/use-product";
import {
  INavigation,
  ListResponse,
  Product as IProduct,
  SelectedProduct,
} from "@/interfaces/index";
import axiosInstanceServer from "@/utils/axiosInstanceServer";
import { formatPrice } from "@/utils/formatPrice";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

interface ProductProps {
  initProduct: IProduct;
}
const Product = ({ initProduct }: ProductProps) => {
  const [data, setData] = useState(initProduct);
  const { query } = useRouter();
  const { product } = useProduct(query.id as string);

  useEffect(() => {
    if (product) setData(product);
  }, [product]);
  const { updateCart, cart } = useCart();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct>({
    _id: "",
    title: "",
    description: "",
    size: "",
    price: 0,
    images: [],
    category: {
      categoryName: "",
      categoryType: "",
    },
    quantity: 1,
  });

  const navigationList: INavigation[] = [
    {
      title: "Trang chủ",
      url: "/",
    },
    {
      title: "Tất cả sản phẩm",
      url: "/products",
    },
    {
      title: `${query.id === "all" ? "Tất cả sản phẩm" : query.id}`,
      url: `/products/${query.id}`,
    },
  ];

  const handleQuantityChange = (numberQuantity: number) => {
    if (numberQuantity === 0) return;
    setSelectedProduct({
      ...selectedProduct,
      quantity: numberQuantity,
    });
  };

  const handleSizeChange = (selectedSize: string) => {
    setSelectedProduct({
      ...selectedProduct,
      size: selectedSize,
    });
  };
  useEffect(() => {
    if (product)
      setSelectedProduct({
        _id: product._id,
        title: product.title,
        description: product.description,
        size: "",
        price: product.price,
        images: product.images,
        category: {
          categoryName: product.category.categoryName,
          categoryType: product.category.categoryType,
        },
        quantity: 1,
      });
  }, [product]);

  const handleAddToCart = async () => {
    if (!selectedProduct.size) return alert("Vui lòng chọn kích cỡ sản phẩm");
    updateCart(selectedProduct);
  };

  return (
    <>
      {/* Category */}
      <Navigation navigationList={navigationList} />

      {/* Content */}
      <div className="max-w-[95%]  mx-auto py-8 z-50 bg-white">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-1 flex gap-6">
            {/* Image list all face product */}
            <div className="w-[12%]">
              {data?.images.map((item, idx) => (
                <Image
                  onClick={() => {
                    setActiveImageIndex(idx);
                  }}
                  className="cursor-pointer"
                  key={item.public_id}
                  src={item.url}
                  priority
                  width="0"
                  height="0"
                  sizes="100vw"
                  alt="avatar"
                  style={{
                    width: "100%",
                    objectFit: "contain",
                    borderRadius: "3px",
                    marginBottom: "12px",
                    border: "1px solid black",
                  }}
                />
              ))}
            </div>

            {/* Image detail of this face */}
            <div className="flex-1">
              {data?.images[activeImageIndex] ? (
                <Image
                  src={data?.images[activeImageIndex].url}
                  priority
                  width="0"
                  height="0"
                  sizes="100vw"
                  alt="avatar"
                  style={{
                    width: "100%",
                    height: "100%",
                    maxHeight: "400px",
                    borderRadius: "3px",
                  }}
                />
              ) : null}
            </div>
          </div>
          <div className="col-span-2">
            {/* Title */}
            <h1 className="font-semibold text-xl">{data?.title}</h1>
            {/* Support title */}
            <p className="text-gray-500 text-sm font-semibold mt-1">
              SKU: ORT.B 203 - XS
            </p>
            {/* Price */}
            <p className="py-3 text-red-500 font-semibold border-t-2 border-dotted my-2 text-xl">
              {data?.price ? formatPrice(data?.price) : null} đ
            </p>

            {/* Sizes */}
            <div className="py-3 border-t-2 border-dotted ">
              {data?.size.map((item, idx) =>
                item ? (
                  <button
                    onClick={() => {
                      handleSizeChange(item);
                    }}
                    key={idx}
                    style={{
                      backgroundColor:
                        item === selectedProduct.size ? "black" : "",
                    }}
                    className="p-2 border-2 w-12 mr-4 text-sm bg-gray-600 text-white"
                  >
                    {item}
                  </button>
                ) : null
              )}
            </div>

            {/* Change quantity */}

            <div className="py-3 border-t-2 border-dotted font-semibold">
              <div className="inline-flex items-center">
                <button
                  onClick={() => {
                    handleQuantityChange(selectedProduct.quantity - 1);
                  }}
                  className="border-r-2 border-dotted p-2 w-8 bg-gray-200  text-sm"
                >
                  -
                </button>
                <p className="border-dotted border-y-2 py-1  px-8">
                  {selectedProduct.quantity}
                </p>
                <button
                  onClick={() => {
                    handleQuantityChange(selectedProduct.quantity + 1);
                  }}
                  className="p-2 border-l-2 w-8 bg-gray-200  text-sm"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                const isLogin = Boolean(
                  JSON.parse(
                    localStorage.getItem(
                      process.env.TOKEN_NAME as string
                    ) as string
                  )
                );
                if (!isLogin) return alert("Vui lòng đăng nhập");
                handleAddToCart();
              }}
              className="border-r-2 transition-all mb-2 ease-in-out duration-300 border-dotted px-16 py-4 font-semibold hover:opacity-80 text-black rounded-sm bg-gray-200  text-sm"
            >
              Thêm vào giõ hàng
            </button>

            {/* Description */}

            <p>
              <span className="font-semibold text-xl">Mô tả</span>
              <br />
              <span className="leading-8">{data?.description}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const url = `/products`;

  const res: ListResponse<IProduct[]> = await axiosInstanceServer.get(url);

  return {
    paths: res.data.map((product) => ({ params: { id: product._id } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<ProductProps> = async (
  context: GetStaticPropsContext
) => {
  const { params } = context;
  if (!params?.id) return { notFound: true };
  const url = `/products/${params.id}`;
  const res: ListResponse<IProduct> = await axiosInstanceServer.get(url);

  return {
    props: {
      initProduct: res.data,
      id: params?.id as string,
    },
    revalidate: 60,
  };
};

export default Product;
