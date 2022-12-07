import ManagerUser from "@/components/Admin/ManagerUser";
import AdminLayout from "@/components/layouts/AdminLayout";
import { useAdmin } from "@/hooks/use-admin";
import { useAuth } from "@/hooks/use-user";
import { User } from "@/interfaces/index";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AdminUser = () => {
  const { users, addEmployee, deleteUser } = useAdmin();
  const { profile } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    if (users) setData(users);
  }, [users]);

  // Protected route
  useEffect(() => {
    if (!localStorage.getItem(process.env.TOKEN_NAME as string))
      router.push("/");
    else if (profile?.role === "CUSTOMER") router.push("/");
  }, []);

  return (
    <AdminLayout>
      <ManagerUser
        users={data}
        deleteUser={deleteUser}
        addEmployee={addEmployee}
      />
    </AdminLayout>
  );
};

export default AdminUser;
