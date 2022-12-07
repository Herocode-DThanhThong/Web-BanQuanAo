import { useCategory } from "@/hooks/use-category";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Navbar = () => {
  const { pathname } = useRouter();
  const { categories } = useCategory();
  return (
    <ul className="flex gap-10">
      <li>
        <Link href={"/"} passHref legacyBehavior>
          <a>
            <h5
              className={`${
                pathname === "/" ? "border-b-gray-700" : ""
              } font-medium text-gray-600 text-base border-b-[3px] border-b-transparent hover:border-b-gray-700  transition-all ease-in-out duration-300 rounded-sm`}
            >
              HOME
            </h5>
          </a>
        </Link>
      </li>
      <li>
        <Link href={"/products"} passHref legacyBehavior>
          <a>
            <h5
              className={`${
                pathname === "/kid" ? "border-b-gray-700" : ""
              } font-medium text-gray-600 text-base border-b-[3px] border-b-transparent hover:border-b-gray-700  transition-all ease-in-out duration-300 rounded-sm`}
            >
              PRODUCTS
            </h5>
          </a>
        </Link>
      </li>
      <li>
        <div className="group relative">
          <h5 className="font-medium text-gray-600 text-base border-b-[3px] border-b-transparent group-hover:border-b-gray-700  transition-all ease-in-out duration-300 rounded-sm ">
            SHOP
          </h5>

          <div className="bg-gray-50  absolute w-[550px] rounded-md hidden group-hover:block transition-all ease-in-out duration-500">
            <ul className="flex gap-8 py-5 px-4">
              {categories?.map((cgory, idx) => (
                <li key={cgory._id}>
                  <h4 className="uppercase font-semibold text-gray-700">
                    {cgory.categoryName}
                  </h4>

                  {cgory.types.map((type, index) => (
                    <Link
                      key={index}
                      href={`/products?categoryType=${type}`}
                      passHref
                      legacyBehavior
                    >
                      <a>
                        <p className="my-3 uppercase hover:opacity-70 text-gray-600">
                          {type}
                        </p>
                      </a>
                    </Link>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </li>
      <li>
        <Link href={"/about"} passHref legacyBehavior>
          <a>
            <h5
              className={`${
                pathname === "/about" ? "border-b-gray-700" : ""
              } font-medium text-gray-600 text-base border-b-[3px] border-b-transparent hover:border-b-gray-700  transition-all ease-in-out duration-300 rounded-sm`}
            >
              ABOUT
            </h5>
          </a>
        </Link>
      </li>
    </ul>
  );
};

export default Navbar;
