import { Product } from "@/interfaces/index";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface CardProductProps {
  product: Product;
}
const CardProduct = ({ product }: CardProductProps) => {
  return (
    <Link href={`/admin/products/${product._id}`}>
      <div className="relative flex gap-2 flex-col cursor-pointer hover:opacity-80 transition-all ease-in-out duration-300">
        <Image
          src={product.images[0]?.url}
          priority
          width="0"
          height="0"
          sizes="100vw"
          alt="avatar"
          style={{
            width: "100%",
            height: "80%",
            borderRadius: 2,
          }}
        />

        <div className="flex-1">
          <div className="mt-4">
            <p className="my-2 font-semibold">
              {product.title.length > 30
                ? product.title.slice(0, 30) + "..."
                : product.title}
            </p>
            <p className="">
              <span className="text-red-500 text-base">
                {product.price.toLocaleString()}đ
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
      </div>
    </Link>
  );
};

export default CardProduct;
