import { LoginPayload } from "@/services/auth-api";
import React, { ChangeEvent, Dispatch, FormEvent, useState } from "react";

interface FormLoginProps {
  login: (formValues: LoginPayload) => Promise<string>;
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
  setTypeForm: Dispatch<React.SetStateAction<string>>;
  error: any;
}
const FormLogin = ({
  login,
  setShowModal,
  setTypeForm,
  error,
}: FormLoginProps) => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const clearFormValue = () => {
    setFormValues({
      email: "",
      password: "",
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Call api
    const err = await login(formValues);

    if (!error && !err) {
      // Clear form values
      clearFormValue();

      // Hide modal

      setShowModal(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute w-[400px]  py-3 px-6 right-0 rounded-md shadow-md border-2 bg-white top-full z-10"
    >
      <div
        onClick={() => {
          setShowModal(false);
        }}
        className="absolute z-10 right-2 top-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 hover:opacity-80 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <h1 className="text-center text-xl">Đăng nhập tài khoản</h1>
      <p className="text-gray-500 text-sm text-center mt-2">
        Nhập email và mật khẩu của bạn
      </p>
      <div className="border-2 my-4 py-2 px-2 rounded-sm overflow-hidden">
        <input
          name="email"
          onChange={handleChange}
          value={formValues.email}
          type="text"
          placeholder="Email"
          className="w-full h-full"
        />
      </div>
      <div className="border-2 my-4 py-2 px-2 rounded-sm overflow-hidden">
        <input
          name="password"
          onChange={handleChange}
          value={formValues.password}
          type="password"
          placeholder="Password"
          className="w-full h-full"
          autoComplete="on"
        />
      </div>
      <p className="text-sm leading-8">
        Bạn đồng ý với các điều khoảng của website chúng tôi? Nếu đồng hãy tiến
        hành đăng nhập
      </p>

      <button className="block py-2 text-center uppercase w-full bg-gray-300 text-white hover:bg-gray-500 transition-all ease-in-out duration-500 mt-2">
        Đăng nhập
      </button>

      <p className="text-sm leading-8 text-center my-2">
        Khách hàng mới?{" "}
        <span
          onClick={() => {
            setTypeForm("register");
          }}
          className="text-sky-500 cursor-pointer hover:underline"
        >
          Tạo tài khoản
        </span>
      </p>
    </form>
  );
};

export default FormLogin;
