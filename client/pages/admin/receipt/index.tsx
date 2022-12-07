import ManagerReceipt from "@/components/Admin/ManagerReceipt";
import AdminLayout from "@/components/layouts/AdminLayout";
import { useReceipt } from "@/hooks/use-receipt";

const AdminProducts = () => {
  const { receipts } = useReceipt();
  return (
    <AdminLayout>
      <ManagerReceipt receipts={receipts} />
    </AdminLayout>
  );
};

export default AdminProducts;
