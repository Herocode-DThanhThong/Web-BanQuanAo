import ManagerCategory from "@/components/Admin/ManagerCategory";
import AdminLayout from "@/components/layouts/AdminLayout";
import { useAuth } from "@/hooks/use-user";

const AdminCategoryProduct = () => {
  const { profile } = useAuth();
  return (
    <AdminLayout>
      {!profile?.role || profile.role !== "ADMIN" ? (
        <h1 className="text-center text-xl text-gray-600 capitalize">
          Bạn không thể thực hiện chức năng này
        </h1>
      ) : (
        <ManagerCategory />
      )}
    </AdminLayout>
  );
};

export default AdminCategoryProduct;
