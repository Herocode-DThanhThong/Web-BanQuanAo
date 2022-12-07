import { useCategory } from "@/hooks/use-category";
import { Image as IImage, Product } from "@/interfaces/index";
import { uploadImageToCloudinary } from "@/utils/uploadImageCloud";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import FormUpdateProduct from "../Form/FormUpdateProduct";
import Loading from "../Loading";
interface ManagerUpdateProductProps {
  product: Product | null | undefined;
  updateProduct: (dataProduct: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}
const ManagerUpdateProduct = ({
  product,
  updateProduct,
  deleteProduct,
}: ManagerUpdateProductProps) => {
  const { categories } = useCategory();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<Array<File>>([]);
  const [formValues, setFormValues] = useState<Product>({
    title: product?.title || "",
    description: product?.description || "",
    size: product?.size || [],
    price: product?.price || 0,
    images: product?.images || [],
    category: {
      categoryName: product?.category.categoryName || "",
      categoryType: product?.category.categoryType || "",
    },
  });

  useEffect(() => {
    if (product) {
      setFormValues({
        title: product?.title || "",
        description: product?.description || "",
        size: product?.size || [],
        price: product?.price || 0,
        images: product?.images || [],
        category: {
          categoryName: product?.category.categoryName || "",
          categoryType: product?.category.categoryType || "",
        },
      });
    }
  }, [product]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSizeChange = (
    e: ChangeEvent<HTMLInputElement>,
    numberIdx: number
  ) => {
    if (e.target.checked) {
      setFormValues({
        ...formValues,
        size: formValues.size.map((item, idx) =>
          idx === numberIdx ? e.target.value : item
        ),
      });
    } else {
      setFormValues({
        ...formValues,
        size: formValues.size.map((item, idx) =>
          idx === numberIdx ? "" : item
        ),
      });
    }
  };

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      category: {
        ...formValues.category,
        [name]: value,
      },
    });
  };

  const handleUploadInputFile = (e: ChangeEvent<HTMLInputElement>) => {
    let newImages: File[] = [];
    let num = 0;
    let err = "";
    const files = e.currentTarget.files
      ? Array.from(e.currentTarget.files)
      : [];

    files.forEach((file) => {
      if (file.size > 1024 * 1024)
        return (err = "Kích thước tối đa của mỗi hình ảnh tối đa là 1mb");

      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/jpg"
      )
        return (err = "Loại hình ảnh phải là jpeg, jpg hoặc png");

      num += 1;
      if (num > 5) return (err = "Upload tối đa 5 hình ảnh");
      if (num <= 5) newImages.push(file);
      return newImages;
    });

    if (err) return alert(err);

    setImages(newImages);
  };

  const deleteImageTypeFile = (numberIdx: number) => {
    const newArr = [...images];
    newArr.splice(numberIdx, 1);
    setImages(newArr);
  };

  const handleEditProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate some values not empty
    if (
      !formValues.price ||
      !formValues.title ||
      !formValues.description ||
      !formValues.category.categoryName ||
      !formValues.category.categoryType
    ) {
      return alert("Vui lòng nhập đầy đủ các trường");
    }

    // Check size not empty
    let countSizeHadValue = 0;
    for (let i = 0; i < formValues.size.length; i++) {
      const value = formValues.size[i];
      if (value) countSizeHadValue++;
    }
    if (countSizeHadValue === 0)
      return alert("Vui lòng chọn kích cỡ cho sản phẩm");

    // Check images not empty
    if (formValues.images.length === 0 && images.length === 0)
      return alert("Vui lòng chọn hình ảnh");

    setLoading(true);

    let imageUrls: IImage[] = [];
    if (images.length !== 0) {
      imageUrls = await uploadImageToCloudinary(images);
    } else {
      imageUrls = formValues.images;
    }

    const data: Product = {
      ...formValues,
      images: imageUrls,
    };

    await updateProduct(data);

    setLoading(false);
  };

  const handleDeleteProduct = async () => {
    if (window.confirm("Bạn chắc chắn muốn xóa sản phẩm này?")) {
      if (product?._id) deleteProduct(product?._id);
    }
  };

  return (
    <>
      <FormUpdateProduct
        formValues={formValues}
        categories={categories}
        images={images}
        handleDeleteProduct={handleDeleteProduct}
        setFormValues={setFormValues}
        deleteImageTypeFile={deleteImageTypeFile}
        handleEditProduct={handleEditProduct}
        handleInputChange={handleInputChange}
        handleSizeChange={handleSizeChange}
        handleRadioChange={handleRadioChange}
        handleUploadInputFile={handleUploadInputFile}
      />
      {loading && <Loading />}
    </>
  );
};

export default ManagerUpdateProduct;
