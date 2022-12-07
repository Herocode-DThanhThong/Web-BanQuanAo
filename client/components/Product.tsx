import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Product } from "../interfaces";
interface ProductProps {
  product: Product;
}
const Product = ({ product }: ProductProps) => {
  return (
    <Link href={`/products/${product._id}`} passHref legacyBehavior>
      <div className="relative  cursor-pointer hover:opacity-80 transition-all ease-in-out duration-300">
        <Image
          src={product.images[0].url}
          priority
          width="0"
          height="0"
          sizes="100vw"
          alt="avatar"
          style={{
            width: "95%",
            height: "75%",
            borderRadius: 2,
          }}
        />

        <div className="mt-4">
          <p className="my-2 font-semibold">
            {product.title.length > 30
              ? product.title.slice(0, 30) + "..."
              : product.title}
            .
          </p>
          <p className="">
            <span className="text-red-500 text-base">
              {formatPrice(product.price)}đ
            </span>
            <span className="text-gray-500 line-through ml-3 text-sm">
              480,000đ
            </span>
          </p>
        </div>

        <div className="py-2 absolute left-2 top-2 bg-white px-4 rounded-sm ">
          <p className="text-red-500 text-sm font-medium">-38%</p>
        </div>
      </div>
    </Link>
  );
};

export default Product;
