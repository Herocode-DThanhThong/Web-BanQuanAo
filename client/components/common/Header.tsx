import { useAuth } from "@/hooks/use-user";
import Image from "next/image";
import { useState } from "react";
import FormLogin from "../Form/FormLogin";
import FormRegister from "../Form/FormRegister";
import ModalInformation from "../ModalInformation";
import Navbar from "../Navbar";
import Privacy from "../Privacy";
import { FormEvent } from "react";
import { useQueryUrl } from "@/hooks/use-query-url";
import { useCart } from "@/hooks/use-carts";
import Cart from "../Cart/Cart";
const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [typeForm, setTypeForm] = useState("login");
  const [searchValue, setSearchValue] = useState("");
  const [showCart, setShowCart] = useState(false);
  const { profile, login, register, error } = useAuth();
  const { cart } = useCart();

  const { router } = useQueryUrl();
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchValue) {
      router.push(`/products?search=${searchValue}`);
      return setSearchValue("");
    }
    router.push(`/products`);
  };

  return (
    <div className="px-8 pt-4 pb-2 mx-auto sticky top-0 bg-white z-30">
      {/* Infomation */}
      <div className="flex justify-between items-center">
        {/* Left */}
        <div className="">
          {/* Top */}
          <div className="flex items-center gap-1">
            {/* Logo */}
            <div className="">
              <Image
                src={"/logo-nobg.png"}
                priority
                width="0"
                height="0"
                sizes="100vw"
                alt="avatar"
                style={{
                  width: "250px",
                  height: "50px",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Privacy Infomation */}
            <Privacy />
          </div>
        </div>
        {/* Right */}
        <div className="">
          {/* Top */}
          <div className="flex items-center gap-8 relative">
            {/* Auth */}
            <div className="relative">
              <div
                onClick={() => {
                  setShowModal(!showModal);
                }}
                className="flex gap-4 items-center"
              >
                <div className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="hover:opacity-90 cursor-pointer">
                  <p className="text-center">
                    {profile ? "" : "Đăng nhập / Đăng ký"}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="">
                      {profile
                        ? `${profile.firstName + " " + profile.lastName}`
                        : "Tài khoản của tôi"}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 pt-1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </p>
                </div>
              </div>

              {/* Form Auth */}
              {showModal ? (
                !profile ? (
                  typeForm === "login" ? (
                    <FormLogin
                      login={login}
                      // if had error => doesn't hide modal
                      error={error}
                      // Function for show/hide modal
                      setTypeForm={setTypeForm}
                      setShowModal={setShowModal}
                    />
                  ) : (
                    <FormRegister
                      register={register}
                      // if had error => doesn't hide modal
                      error={error}
                      // Function for show/hide modal
                      setTypeForm={setTypeForm}
                      setShowModal={setShowModal}
                    />
                  )
                ) : (
                  <ModalInformation setShowModal={setShowModal} />
                )
              ) : null}
            </div>

            {/* Cart */}
            <div className="cursor-pointer flex gap-2 items-center relative">
              <button
                onClick={() => {
                  const isLogin = Boolean(
                    JSON.parse(
                      localStorage.getItem(
                        process.env.TOKEN_NAME as string
                      ) as string
                    )
                  );

                  if (!isLogin) {
                    return alert("Vui lòng đăng nhập");
                  }
                  setShowCart(!showCart);
                }}
                className="flex gap-2 items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7"
                >
                  <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                </svg>

                <p>
                  Giỏ hàng{" "}
                  {cart?.productCart ? `(${cart.productCart.length})` : null}
                </p>
              </button>

              {showCart ? <Cart /> : null}
            </div>
          </div>
          {/* Bottom */}
        </div>
      </div>

      <div className="pl-7 mt-2 flex justify-between items-center">
        {/* Navbar */}
        <Navbar />

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="flex items-center relative rounded-md overflow-hidden"
        >
          <input
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            type="text"
            className="p-2 border-2 w-[340px]"
            placeholder="Tìm kiếm sản phẩm theo tên..."
          />
          <button className="bg-gray-300 h-full absolute right-0 p-2">
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
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
