import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Sidebar = () => {
  const { pathname } = useRouter();
  return (
    <div className="bg-[#273339] top-0 bottom-0 left-0 px-6 py-4 text-white fixed">
      <div className="border-b-2 pb-3 border-gray-500">
        <div className="bg-white flex justify-center rounded-md overflow-hidden cursor-pointer">
          <Link href="/" passHref legacyBehavior>
            <a>
              <Image
                src={"/logo-nobg.png"}
                priority
                width="0"
                height="0"
                sizes="100vw"
                alt="avatar"
                style={{
                  width: "250px",
                  height: "80px",
                  objectFit: "cover",
                }}
              />
            </a>
          </Link>
        </div>
        <p className="text-center mt-4 text-xl font-semibold capitalize">
          Quản lý hệ thống
        </p>
      </div>
      <div className="">
        <ul>
          <Link href={"/admin/users"} passHref legacyBehavior>
            <li
              className={`middle none cursor-pointer center my-4 transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none  py-3 rounded-lg ${
                pathname === "/admin/users"
                  ? "bg-gradient-to-tr from-blue-600 to-blue-400 shadow-blue-500/20 shadow-md"
                  : ""
              } text-white hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize`}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="text-white">Quản lý người dùng</span>
            </li>
          </Link>
          <Link href={"/admin/category"} passHref legacyBehavior>
            <li
              className={`middle none cursor-pointer center my-4 transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none  py-3 rounded-lg ${
                pathname === "/admin/category"
                  ? "bg-gradient-to-tr from-blue-600 to-blue-400 shadow-blue-500/20 shadow-md"
                  : ""
              } text-white hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize`}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.625 6.75a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0A.75.75 0 018.25 6h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75zM2.625 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM7.5 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12A.75.75 0 017.5 12zm-4.875 5.25a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className=" text-white ">Quản lý danh mục sản phẩm</span>
            </li>
          </Link>
          <Link href={"/admin/products"} passHref legacyBehavior>
            <li
              className={`middle none cursor-pointer center my-4 transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none  py-3 rounded-lg ${
                pathname.includes("/admin/products")
                  ? "bg-gradient-to-tr from-blue-600 to-blue-400 shadow-blue-500/20 shadow-md"
                  : ""
              } text-white hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize`}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03zM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 00.372-.648V7.93zM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 00.372.648l8.628 5.033z" />
                </svg>
              </span>
              <span className=" text-white ">Quản lý sản phẩm</span>
            </li>
          </Link>
          <Link href={"/admin/receipt"} passHref legacyBehavior>
            <li
              className={`middle none cursor-pointer center my-4 transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none  py-3 rounded-lg ${
                pathname === "/admin/receipt"
                  ? "bg-gradient-to-tr from-blue-600 to-blue-400 shadow-blue-500/20 shadow-md"
                  : ""
              } text-white hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize`}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 1.5c-1.921 0-3.816.111-5.68.327-1.497.174-2.57 1.46-2.57 2.93V21.75a.75.75 0 001.029.696l3.471-1.388 3.472 1.388a.75.75 0 00.556 0l3.472-1.388 3.471 1.388a.75.75 0 001.029-.696V4.757c0-1.47-1.073-2.756-2.57-2.93A49.255 49.255 0 0012 1.5zm3.53 7.28a.75.75 0 00-1.06-1.06l-6 6a.75.75 0 101.06 1.06l6-6zM8.625 9a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm5.625 3.375a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className=" text-white ">Quản lý đơn hàng</span>
            </li>
          </Link>
        </ul>
      </div>

      <div className="border-t-2 border-gray-500">
        <ul>
          <li className="middle none cursor-pointer  center transition-all my-4 disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none py-3 rounded-lg  text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span className="text-white ">Thống kê doanh thu theo tháng</span>
          </li>
          <li className="middle none cursor-pointer  center transition-all my-4 disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none py-3 rounded-lg  text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M2.273 5.625A4.483 4.483 0 015.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 3H5.25a3 3 0 00-2.977 2.625zM2.273 8.625A4.483 4.483 0 015.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 6H5.25a3 3 0 00-2.977 2.625zM5.25 9a3 3 0 00-3 3v6a3 3 0 003 3h13.5a3 3 0 003-3v-6a3 3 0 00-3-3H15a.75.75 0 00-.75.75 2.25 2.25 0 01-4.5 0A.75.75 0 009 9H5.25z" />
              </svg>
            </span>
            <span className=" text-white ">Thống kê sản phẩm tồn kho</span>
          </li>
          <li className="middle none cursor-pointer  center my-4 transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none  py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z" />
                <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725H15.75z" />
                <path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
              </svg>
            </span>
            <span className=" text-white ">Thống kê sản phẩm bán chạy</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
