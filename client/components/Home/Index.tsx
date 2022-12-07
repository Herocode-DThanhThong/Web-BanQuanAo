import { Product as IProduct } from "@/interfaces/index";
import Link from "next/link";
import Banner from "../Banner";
import Product from "../Product";
interface HomePageProps {
  products: IProduct[] | null | undefined;
  pagination:
    | {
        limit: number;
        page: number;
        total: number;
      }
    | undefined;
}

const HomePage = ({ products }: HomePageProps) => {
  return (
    <div className="mt-4">
      <Banner />
      <div className="my-8 max-w-[95%] mx-auto">
        <h1 className="text-center uppercase text-4xl font-medium my-12">
          products
        </h1>

        <div className="grid grid-cols-5 gap-2">
          {products?.map((pro, idx) => (
            <Product key={pro._id} product={pro} />
          ))}
        </div>

        <Link href={"/products"}>
          <button className="block mx-auto bg-gray-500 text-white px-6 py-2 font-semibold transition-all ease-in-out duration-300 hover:bg-gray-700 mt-4 rounded-md">
            Xem thêm
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
