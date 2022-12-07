import ManagerProducts from "@/components/Admin/ManagerProducts";
import AdminLayout from "@/components/layouts/AdminLayout";
import { useProducts } from "@/hooks/use-product";
import { useQueryUrl } from "@/hooks/use-query-url";
import { useAuth } from "@/hooks/use-user";

const AdminProducts = () => {
  const { page, search } = useQueryUrl();
  const { products, pagination } = useProducts(page, search);
  const { profile } = useAuth();

  return (
    <AdminLayout>
      {!profile?.role || profile.role !== "ADMIN" ? (
        <h1 className="text-center text-xl text-gray-600 capitalize">
          Bạn không thể thực hiện chức năng này
        </h1>
      ) : (
        <ManagerProducts products={products} pagination={pagination} />
      )}
    </AdminLayout>
  );
};

export default AdminProducts;
