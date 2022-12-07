import Link from "next/link";
import React, { ReactNode } from "react";
import Navbar from "../Admin/Navbar";
import Sidebar from "../Admin/Sidebar";

interface AdminLayoutProps {
  children: ReactNode;
}
const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="p-4 bg-[#f5f7f8] min-h-screen">
      <div className="flex gap-8">
        <Sidebar />

        <div className="flex-1 ml-[370px]">
          <Navbar />
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
