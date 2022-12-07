import { useReceipt } from "@/hooks/use-receipt";
import { useAuth } from "@/hooks/use-user";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState, useEffect } from "react";
const Navbar = () => {
  const { logout } = useAuth();
  const [quantityReceipt, setQuantityReceipt] = useState(0);
  const { pathname } = useRouter();
  const { receipts } = useReceipt();
  const navbarList = [
    {
      path: "/admin/users",
      dataUrl: [{ path: "/admin/users", title: "Quản lý người dùng" }],
    },
    {
      path: "/admin/category",
      dataUrl: [{ path: "/admin/users", title: "Quản lý danh mục sản phẩm" }],
    },
    {
      path: "/admin/products",
      dataUrl: [{ path: "/admin/products", title: "Quản lý sản phẩm" }],
    },
    {
      path: "/admin/products/add",
      dataUrl: [
        { path: "/admin/products", title: "Quản lý sản phẩm" },
        { path: "/admin/products/add", title: "Thêm sản phẩm" },
      ],
    },
    {
      path: "/admin/products/[id]",
      dataUrl: [
        { path: "/admin/products", title: "Quản lý sản phẩm" },
        { path: "/admin/products", title: "Cập nhật sản phẩm" },
      ],
    },
    {
      path: "/admin/receipt",
      dataUrl: [{ path: "/admin/receipt", title: "Quản lý hóa đơn" }],
    },
  ];

  useEffect(() => {
    if (receipts) {
      let count = 0;
      receipts.forEach((rp, idx) => {
        if (!rp.confirmed) count++;
      });

      setQuantityReceipt(count);
    }
  }, [receipts]);

  return (
    <nav className="block  bg-[#f5f7f8] z-20 sticky top-0 flex-1 text-black shadow-none transition-all px-0 py-1">
      <div className="flex px-2  flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        {/* Content Left */}
        <div className="capitalize">
          <nav aria-label="breadcrumb" className="w-max">
            <ol className="flex flex-wrap items-center w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all">
              <li className="flex items-center text-blue-gray-900 antialiased transition-colors duration-300 hover:text-light-blue-500">
                <p className="block antialiased leading-normal text-blue-gray-900 font-normal opacity-50 transition-all">
                  Admin
                </p>
                <span className="text-blue-gray-500  antialiased mx-2 pointer-events-none select-none">
                  /
                </span>
              </li>
              {navbarList.map((item, index) =>
                item.path === pathname
                  ? item.dataUrl.map((childData, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-blue-gray-900 antialiased transition-colors duration-300 hover:text-light-blue-500"
                      >
                        <Link href={childData.path} passHref legacyBehavior>
                          <p className="cursor-pointer block antialiased leading-normal text-blue-gray-900 font-normal">
                            {childData.title}
                          </p>
                        </Link>

                        {idx < item.dataUrl.length - 1 ? (
                          <span className="text-blue-gray-500  antialiased mx-2 pointer-events-none select-none">
                            /
                          </span>
                        ) : null}
                      </li>
                    ))
                  : null
              )}
            </ol>
          </nav>
          <h6 className="block my-2 antialiased text-xl tracking-normal font-semibold leading-relaxed text-blue-gray-900">
            {navbarList.map((item, index) =>
              item.path === pathname
                ? item.dataUrl.map((childData, idx) =>
                    idx === item.dataUrl.length - 1 ? `${childData.title}` : ""
                  )
                : null
            )}
          </h6>
        </div>

        {/* Content Right */}
        <div className="flex items-center">
          <div>
            <button
              className="middle none font-bold center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none py-3 rounded-lg text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 hidden items-center gap-1 px-4 xl:flex"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-8 w-8 text-blue-gray-500"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  clipRule="evenodd"
                />
              </svg>
              Duong thanh thong
            </button>
            <button
              className="relative middle none font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 grid xl:hidden"
              type="button"
            >
              <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-5 text-blue-gray-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>
          </div>
          <button
            onClick={() => {
              if (window.confirm("Bạn chắc chắn muốn đăng xuất?")) {
                logout();
              }
            }}
            className="relative middle none font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
            type="button"
          >
            <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>

          <button
            className="relative middle none font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
            type="button"
          >
            <Badge badgeContent={quantityReceipt} color="error">
              <NotificationsIcon color="action" />
            </Badge>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
