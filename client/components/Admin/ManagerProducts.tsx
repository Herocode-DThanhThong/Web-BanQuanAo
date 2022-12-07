import { Product } from "@/interfaces/index";
import Link from "next/link";
import Pagination from "../Pagination";
import CardProduct from "./CardProduct";
interface ManagerProductsProps {
  products: Product[] | null | undefined;
  pagination:
    | {
        limit: number;
        page: number;
        total: number;
      }
    | undefined;
}
const ManagerProducts = ({ products, pagination }: ManagerProductsProps) => {
  return (
    <div className="">
      <Link href={"/admin/products/add"} passHref legacyBehavior>
        <a>
          <button className="hover:opacity-80 z-40 transition-all ease-in-out duration-300 fixed bottom-4 right-4 bg-indigo-600 text-white p-3 flex items-center justify-center rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </a>
      </Link>
      <div className="grid grid-cols-5 gap-6">
        {products?.map((product, idx) => (
          <CardProduct product={product} key={product._id} />
        ))}
      </div>
      <div className="mt-8">
        <Pagination pagination={pagination} />
      </div>
    </div>
  );
};

export default ManagerProducts;
