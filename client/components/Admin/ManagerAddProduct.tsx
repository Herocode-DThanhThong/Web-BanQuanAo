import { useCategory } from "@/hooks/use-category";
import { useProducts } from "@/hooks/use-product";
import { Product } from "@/interfaces/index";
import { uploadImageToCloudinary } from "@/utils/uploadImageCloud";
import { ChangeEvent, FormEvent, useState } from "react";
import FormAddProduct from "../Form/FormAddProduct";
import Loading from "../Loading";

const ManagerAddProduct = () => {
  const { categories } = useCategory();
  const [loading, setLoading] = useState(false);

  const { addProduct } = useProducts();
  const [images, setImages] = useState<Array<File>>([]);
  const [formValues, setFormValues] = useState<Product>({
    title: "",
    description: "",
    size: ["", "", "", "", "", ""],
    price: 0,
    images: [],
    category: {
      categoryName: "",
      categoryType: "",
    },
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const clearFormValues = () => {
    setFormValues({
      title: "",
      description: "",
      size: ["", "", "", "", "", ""],
      price: 0,
      images: [],
      category: {
        categoryName: "",
        categoryType: "",
      },
    });

    setImages([]);
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

  const deleteImage = (numberIdx: number) => {
    const newArr = [...images];
    newArr.splice(numberIdx, 1);
    setImages(newArr);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate some values not empty
    if (
      !formValues.price ||
      !formValues.title ||
      !formValues.description ||
      images.length === 0 ||
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

    setLoading(true);

    const imageUrls = await uploadImageToCloudinary(images);

    const data: Product = {
      ...formValues,
      images: imageUrls,
    };

    const err = await addProduct(data);

    if (!err) clearFormValues();

    setLoading(false);
  };

  return (
    <>
      <FormAddProduct
        formValues={formValues}
        categories={categories}
        images={images}
        deleteImage={deleteImage}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        handleSizeChange={handleSizeChange}
        handleRadioChange={handleRadioChange}
        handleUploadInputFile={handleUploadInputFile}
      />
      {loading && <Loading />}
    </>
  );
};

export default ManagerAddProduct;
