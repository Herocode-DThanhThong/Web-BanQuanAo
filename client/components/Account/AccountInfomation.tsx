import { User } from "@/interfaces/index";
import React from "react";
interface AccountInformationProps {
  profile: User | undefined;
  editProfile: (u: Partial<User>) => Promise<void>;
}
const AccountInfomation = ({
  editProfile,
  profile,
}: AccountInformationProps) => {
  const handleEdit = (field: string) => {
    const content = window.prompt("Nhập nội dung cập nhật tại đây");

    // If had content => submit
    if (content) {
      // If field gender => value include in "Nam" or "Nu"
      if (field === "gender") {
        const values = ["NAM", "NU"];
        if (!values.includes(content.toUpperCase()))
          return alert("Giới tính phải là nam hoặc nữ");
      }

      // Call api edit profile
      editProfile({
        _id: profile?._id,
        [field]: content,
      });
    }
  };

  return (
    <>
      {/* title */}
      <h3 className="uppercase font-semibold mb-6 pb-2 border-b-[1px]">
        Thông tin tài khoản
      </h3>

      {/* Infomation */}
      <div className="">
        <div className="my-2 flex items-center gap-2">
          Họ:
          <span className="font-semibold capitalize">{profile?.firstName}</span>
          <span>
            <button
              onClick={() => {
                handleEdit("firstName");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </button>
          </span>
        </div>
        <div className="my-2 flex items-center gap-2">
          Tên:{" "}
          <span className="font-semibold capitalize">{profile?.lastName}</span>
          <span>
            <button
              onClick={() => {
                handleEdit("lastName");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </button>
          </span>
        </div>
        <div className="my-2 flex items-center gap-2">
          Giới tính:{" "}
          <span className="font-semibold capitalize">{profile?.gender}</span>
          <button
            onClick={() => {
              handleEdit("gender");
            }}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </span>
          </button>
        </div>
        <div className="my-2 flex items-center gap-2">
          Ngày sinh: <span className="font-semibold">{profile?.birthday}</span>
          <button
            onClick={() => {
              handleEdit("birthday");
            }}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </span>
          </button>
        </div>
        <div className="my-2 flex items-center gap-2">
          Số điện thoại:
          <span className="font-semibold"> {profile?.phone}</span>
          <button
            onClick={() => {
              handleEdit("phone");
            }}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Product Ordered */}
      {/* <div className="my-2 bg-gray-100 p-2 rounded-sm border">
        <div className="bg-white py-2 px-3 rounded-sm">
          <h1>Sản phẩm bạn đã đặt hàng thành công (0)</h1>
        </div>
      </div> */}
    </>
  );
};

export default AccountInfomation;
