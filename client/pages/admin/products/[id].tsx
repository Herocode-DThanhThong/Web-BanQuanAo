import ManagerUpdateProduct from "@/components/Admin/ManagerUpdateProduct";
import AdminLayout from "@/components/layouts/AdminLayout";
import { useProduct } from "@/hooks/use-product";
import { useAuth } from "@/hooks/use-user";
import { useRouter } from "next/router";
import React from "react";

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { profile } = useAuth();

  const { product, updateProduct, deleteProduct } = useProduct(id as string);

  return (
    <AdminLayout>
      {!profile?.role || profile.role !== "ADMIN" ? (
        <h1 className="text-center text-xl text-gray-600 capitalize">
          Bạn không thể thực hiện chức năng này
        </h1>
      ) : (
        <ManagerUpdateProduct
          product={product}
          updateProduct={updateProduct}
          deleteProduct={deleteProduct}
        />
      )}
    </AdminLayout>
  );
};

export default ProductDetail;
