import { useAuth } from "@/hooks/use-user";
import { useRouter } from "next/router";
import { useState } from "react";
import SubheadLine from "../SubheadLine";
import AccountInfomation from "./AccountInfomation";
import AddressList from "./AddressList";

const AccountPage = () => {
  const [type, setType] = useState<"info" | "address">("info");
  const { profile, editProfile } = useAuth();

  return (
    <div className="max-w-[95%] mx-auto my-4">
      <h1 className="text-center font-semibold text-4xl">Tài khoản của bạn</h1>
      <SubheadLine />

      <div className="border-y-[1px] border-gray-200">
        <div className="my-4 px-4 flex gap-16">
          {/* Navigation */}
          <div className="">
            <h3 className="uppercase font-semibold mb-8">tài khoản</h3>
            <div className="">
              <ul>
                <li
                  onClick={() => {
                    setType("info");
                  }}
                  className="my-4"
                >
                  <span className="cursor-pointer text-gray-500 font-semibold hover:opacity-80">
                    Thông tin tài khoản
                  </span>
                </li>
                <li
                  onClick={() => {
                    setType("address");
                  }}
                  className="my-4"
                >
                  <span className="cursor-pointer hover:opacity-80">
                    Địa chỉ
                  </span>
                </li>
              </ul>
            </div>
          </div>
          {/* Content */}
          <div className="flex-1">
            {type === "info" ? (
              <AccountInfomation editProfile={editProfile} profile={profile} />
            ) : (
              <AddressList profile={profile} editProfile={editProfile} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
