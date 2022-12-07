import Navigation from "@/components/Navigation";
import Pagination from "@/components/Pagination";
import Product from "@/components/Product";
import Filter from "@/components/Products/Filter";
import Sidebar from "@/components/Products/Sidebar";
import { useProducts } from "@/hooks/use-product";
import { useQueryUrl } from "@/hooks/use-query-url";
import {
  INavigation,
  ListResponse,
  Product as IProduct,
} from "@/interfaces/index";
import axiosInstanceServer from "@/utils/axiosInstanceServer";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
interface ProductCollectionAllProps {
  initProducts: IProduct[] | null;
}
const ProductCollectionAll = ({ initProducts }: ProductCollectionAllProps) => {
  const [navigationList, setNavigationList] = useState<INavigation[]>([
    {
      title: "Trang chủ",
      url: "/",
    },
    {
      title: "Tất cả sản phẩm",
      url: `/products`,
    },
  ]);
  const { page, search, categoryType, price, createdAt } = useQueryUrl();
  const { products, pagination } = useProducts(
    page,
    search,
    categoryType,
    price,
    createdAt
  );
  console.log(categoryType);
  const [data, setData] = useState(initProducts);

  useEffect(() => {
    if (products) setData(products);
  }, [products]);

  useEffect(() => {
    if (categoryType) {
      setNavigationList([
        {
          title: "Trang chủ",
          url: "/",
        },
        {
          title: "Tất cả sản phẩm",
          url: `/products`,
        },
        {
          title: categoryType,
          url: `/products?categoryType=${categoryType}`,
        },
      ]);
    } else {
      setNavigationList([
        {
          title: "Trang chủ",
          url: "/",
        },
        {
          title: "Tất cả sản phẩm",
          url: `/products`,
        },
      ]);
    }
  }, [categoryType]);
  return (
    <div className="min-h-screen relative">
      {/* Navigation */}
      <Navigation navigationList={navigationList} />

      {/* Sidebar products */}
      <div className="max-w-[95%] mx-auto py-8 z-50 bg-white">
        <div className="flex gap-4">
          <div className="max-w-[25%] h-full sticky  top-[150px] bg-white">
            <Sidebar />
          </div>

          {data && data.length > 0 ? (
            <div className="flex-1">
              {/* Filter */}
              <Filter />
              {/* Products */}
              <div className="grid grid-cols-5 gap-6 mt-2">
                {data?.map((product, idx) => (
                  <Product product={product} key={product._id} />
                ))}
              </div>
              <div className="mt-8">
                <Pagination pagination={pagination} />
              </div>
            </div>
          ) : (
            <h2 className="text-base text-gray-600">
              Xin lỗi! Chúng tôi hiện chưa có sản phẩm nào
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<
  ProductCollectionAllProps
> = async () => {
  const url = `/products`;
  const res: ListResponse<IProduct[] | null> = await axiosInstanceServer.get(
    url
  );

  return {
    props: {
      initProducts: res.data,
    },
    revalidate: 10,
  };
};

export default ProductCollectionAll;
