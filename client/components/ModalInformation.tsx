import { useAuth } from "@/hooks/use-user";
import Link from "next/link";
import React, { Dispatch } from "react";
interface ModalInformationProps {
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
}
const ModalInformation = ({ setShowModal }: ModalInformationProps) => {
  const { profile, logout } = useAuth();
  return (
    <div className="absolute w-[200px] py-3 px-4 right-0 rounded-md shadow-md border-2 bg-white top-full z-10">
      <div className="w-full">
        {profile?.role === "ADMIN" || profile?.role === "EMPLOYEE" ? (
          <Link href={"/admin/users"} passHref legacyBehavior>
            <a>
              <button className="py-2 block  w-full hover:opacity-60 border-b-2">
                Quản lí hệ thống
              </button>
            </a>
          </Link>
        ) : null}

        <Link href={"/account"} passHref legacyBehavior>
          <a>
            <button
              onClick={() => {
                // Hide modal
                setShowModal(false);
              }}
              className="py-2 block  w-full hover:opacity-60 border-b-2"
            >
              Tài khoản của bạn
            </button>
          </a>
        </Link>

        <button
          onClick={() => {
            // Call api logout
            logout();

            // Hide modal
            setShowModal(false);
          }}
          className="pt-2 block  w-full hover:opacity-60"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default ModalInformation;
