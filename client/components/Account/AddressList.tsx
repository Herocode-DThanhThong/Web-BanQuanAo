import { Address, User } from "@/interfaces/index";
import React, { FormEvent, useState } from "react";
import FormAddAddress from "../Form/FormAddAddress";
interface AddressListProps {
  profile: User | undefined;
  editProfile: (u: Partial<User>) => Promise<void>;
}
const AddressList = ({ profile, editProfile }: AddressListProps) => {
  const [showFormAddAddress, setShowFormAddAddress] = useState(false);
  const [addressValue, setAddressValue] = useState<Address>({
    default: false,
    receiverName: "",
    gender: "",
    phone: "",
    address: "",
  });

  const clearFormAddress = () => {
    setAddressValue({
      default: false,
      receiverName: "",
      gender: "",
      phone: "",
      address: "",
    });
  };

  const handleAddAddress = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !addressValue.receiverName ||
      !addressValue.gender ||
      !addressValue.phone ||
      !addressValue.address
    )
      return alert("Vui lòng nhập đầy đủ thông tin");

    const genderList = ["nam", "nu"];
    if (!genderList.includes(addressValue.gender.toLowerCase()))
      return alert("Giới tính phải là nam hoặc nu");

    if (profile) {
      const newAddress = [...profile.addressList, addressValue];
      await editProfile({
        ...profile,
        addressList: newAddress,
      });

      clearFormAddress();
    }
  };

  const handleSetDefaultAddress = async (numberIdx: number) => {
    if (profile) {
      const newAddress = profile.addressList.map((add, idx) => {
        if (idx === numberIdx)
          return {
            ...add,
            default: true,
          };

        return {
          ...add,
          default: false,
        };
      });

      await editProfile({
        ...profile,
        addressList: newAddress,
      });
    }
  };

  const handleDeleteAddress = async (numberIdx: number) => {
    if (profile) {
      if (window.confirm("Bạn chắc chắn muốn xóa địa chỉ này?")) {
        const newAddress = profile.addressList.filter(
          (add, idx) => idx !== numberIdx
        );

        await editProfile({
          ...profile,
          addressList: newAddress,
        });
      }
    }
  };

  return (
    <>
      {/* title */}
      <h3 className="uppercase font-semibold mb-6 pb-2 border-b-[1px]">
        Danh sách địa chỉ
      </h3>
      {/* Add new address */}
      <div className="flex justify-center flex-col items-center mb-4">
        <button
          onClick={() => {
            setShowFormAddAddress(!showFormAddAddress);
          }}
          className="px-3 py-2 bg-gray-400 rounded-sm  text-white hover:opacity-80 uppercase"
        >
          Nhập địa chỉ mới
        </button>

        {showFormAddAddress ? (
          <FormAddAddress
            handleSubmit={handleAddAddress}
            addressValue={addressValue}
            setAddressValue={setAddressValue}
          />
        ) : null}
      </div>
      {/* Address List */}
      <div className="grid grid-cols-2 gap-6">
        {/* Address item */}

        {profile?.addressList.map((a, i) => (
          <div className="" key={i}>
            <div className="rounded-sm bg-sky-100 px-3 py-2 flex justify-between items-center">
              <h1 className=" text-black font-semibold">{a.receiverName}</h1>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleSetDefaultAddress(i);
                  }}
                  style={{
                    background: a.default ? "#f97316" : "white",
                    color: a.default ? "white" : "black",
                  }}
                  className="px-2 py-1 border capitalize transition-all ease-in-out duration-300 hover:bg-orange-500 hover:cursor-pointer hover:text-white border-orange-500 rounded-sm text-sm"
                >
                  {!a.default ? "Chọn mặc định" : "mặc định"}
                </button>
                <button
                  onClick={() => {
                    handleDeleteAddress(i);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="bg-gray-50 p-3">
              <p className="">
                Tên người nhận:{" "}
                <span className="font-semibold">{a.receiverName}</span>
              </p>
              <p className="my-2">
                Giới tính: <span className="font-semibold">{a.gender}</span>
              </p>
              <p className="my-2">
                Số điện thoại:
                <span className="font-semibold"> {a.phone}</span>
              </p>
              <p className="my-2">
                Địa chỉ:
                <span className="font-semibold"> {a.address}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AddressList;
