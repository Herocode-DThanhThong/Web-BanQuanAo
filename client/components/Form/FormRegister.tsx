import { User } from "@/interfaces/index";
import { Radio } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { ChangeEvent, Dispatch, FormEvent, useState } from "react";
interface FormRegisterProps {
  register: (formValues: User) => Promise<string>;
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
  setTypeForm: Dispatch<React.SetStateAction<string>>;
  error: any;
}
const FormRegister = ({
  register,
  setShowModal,
  setTypeForm,
  error,
}: FormRegisterProps) => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    birthday: "2022-11-25",
    gender: "nam",
    phone: "",
    email: "",
    password: "",
    addressList: [],
  });

  const clearFormValue = () => {
    setFormValues({
      firstName: "",
      lastName: "",
      birthday: "2022-11-25",
      gender: "nam",
      phone: "",
      email: "",
      password: "",
      addressList: [],
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
    const err = await register(formValues);

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
      <h1 className="text-center text-xl">????ng k?? t??i kho???n</h1>
      {/* Full name */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="border-2 py-2 px-2 rounded-sm overflow-hidden">
          <input
            className="w-full h-full"
            name="firstName"
            onChange={handleChange}
            type="text"
            placeholder="H???"
            value={formValues.firstName}
          />
        </div>
        <div className="border-2 py-2 px-2 rounded-sm overflow-hidden">
          <input
            className="w-full h-full"
            name="lastName"
            onChange={handleChange}
            type="text"
            placeholder="T??n"
            value={formValues.lastName}
          />
        </div>
      </div>

      {/* Gender + Birthday */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="">
          <TextField
            id="date"
            label="Birthday"
            type="date"
            value={formValues.birthday}
            InputLabelProps={{
              shrink: true,
            }}
            name="birthday"
            onChange={handleChange}
          />
        </div>
        <div className="py-2 flex items-center rounded-sm overflow-hidden">
          <div className="flex items-center">
            <Radio
              checked={formValues.gender === "nam"}
              onChange={handleChange}
              value="nam"
              name="gender"
            />
            <span>Nam</span>
          </div>
          <div className="flex items-center">
            <Radio
              checked={formValues.gender === "nu"}
              onChange={handleChange}
              value="nu"
              name="gender"
            />
            <span>N???</span>
          </div>
        </div>
      </div>

      <div className="border-2 my-4 py-2 px-2 rounded-sm overflow-hidden">
        <input
          className="w-full h-full"
          onChange={handleChange}
          name="phone"
          type="text"
          placeholder="S??? ??i???n tho???i"
          value={formValues.phone}
        />
      </div>

      <div className="border-2 my-4 py-2 px-2 rounded-sm overflow-hidden">
        <input
          className="w-full h-full"
          onChange={handleChange}
          name="email"
          type="text"
          placeholder="Email"
          value={formValues.email}
        />
      </div>
      <div className="border-2 my-4 py-2 px-2 rounded-sm overflow-hidden">
        <input
          className="w-full h-full"
          onChange={handleChange}
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="on"
          value={formValues.password}
        />
      </div>

      <p className="text-sm leading-8">
        B???n ?????ng ?? v???i c??c ??i???u kho???ng c???a website ch??ng t??i? N???u ?????ng ?? h??y
        ti???n h??nh ????ng k??
      </p>

      <button className="block py-2 text-center uppercase w-full bg-gray-300 text-white hover:bg-gray-500 transition-all ease-in-out duration-500 mt-2">
        ????ng k??
      </button>

      <p className="text-sm leading-8 text-center my-2">
        B???n ???? c?? t??i kho???n?{" "}
        <span
          onClick={() => {
            setTypeForm("login");
          }}
          className="text-sky-500 cursor-pointer hover:underline"
        >
          ????ng nh???p ngay
        </span>
      </p>
    </form>
  );
};

export default FormRegister;
