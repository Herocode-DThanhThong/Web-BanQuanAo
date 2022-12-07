import { useCategory } from "@/hooks/use-category";
import { useRef, useEffect } from "react";
import { Category } from "@/interfaces/index";
import React, { ChangeEvent, FormEvent, useState } from "react";
import FormAddCategory from "../Form/FormAddCategory";
import Loading from "../Loading";
interface ICategory {
  categoryName: string;
  types: Array<string>;
}
const ManagerCategory = () => {
  const [formValues, setFormValues] = useState<ICategory>({
    categoryName: "",
    types: [""],
  });
  const [isScroll, setIsScroll] = useState(false);

  const bottomLiRef = useRef<HTMLDivElement | null>(null);

  const {
    categories,
    isValidating,
    addCategory,
    updateCategory,
    deleteCategory,
  } = useCategory();

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const clearFormValues = () => {
    setFormValues({
      categoryName: "",
      types: [""],
    });
  };

  const handleAddType = () => {
    setFormValues({
      ...formValues,
      types: [...formValues.types, ""],
    });
  };

  const handleDeleteType = (numberIdx: number) => {
    if (formValues.types.length === 1) return;
    const newTypes = formValues.types.filter((t, i) => i !== numberIdx);
    setFormValues({
      ...formValues,
      types: newTypes,
    });
  };

  const handleTypeCategoryChange = (
    e: ChangeEvent<HTMLInputElement>,
    numberIdx: number
  ) => {
    const newTypes = formValues.types.map((t, i) => {
      if (i === numberIdx) return e.target.value;
      return t;
    });
    setFormValues({
      ...formValues,
      types: newTypes,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate not empty in types categories and category name not empty
    if (!formValues.categoryName)
      return alert("Tên danh mục không được bỏ trống");

    for (let i = 0; i < formValues.types.length; i++) {
      const type = formValues.types[i];
      if (!type) return alert(`Vui lòng điền loại danh mục số ${i + 1}`);
    }

    const err = await addCategory(formValues);

    if (!err) {
      clearFormValues();
      setTimeout(() => {
        bottomLiRef.current?.scrollIntoView({
          block: "end",
          behavior: "smooth",
        });
      }, 100);
    }
  };

  const handleEditCategoryName = async (oldData: Category) => {
    const nCategoryName = window.prompt("Nhập tên danh mục mới tại đây");
    if (nCategoryName) {
      const nCategory: Category = {
        ...oldData,
        categoryName: nCategoryName,
      };

      await updateCategory(nCategory);
    }
  };

  const handleEditCategoryType = async (
    oldData: Category,
    numberIdx: number
  ) => {
    const nType = window.prompt("Chỉnh sửa loại danh mục tại đây");
    if (nType) {
      const nCategoryTypes = oldData.types.map((t, i) => {
        if (i === numberIdx) {
          return nType;
        }
        return t;
      });

      const nCategory: Category = {
        ...oldData,
        types: nCategoryTypes,
      };

      await updateCategory(nCategory);
    }
  };

  const handleDeleteCategoryType = async (
    oldData: Category,
    numberIdx: number
  ) => {
    if (window.confirm("Bạn chắc chắn muốn xóa loại danh mục này?")) {
      const nCategory: Category = {
        ...oldData,
        types: oldData.types.filter((t, i) => i !== numberIdx),
      };
      await updateCategory(nCategory);
    }
  };

  const handleAddCategoryType = async (oldData: Category) => {
    const nType = window.prompt("Nhập loại danh mục mới tại đây");
    if (nType) {
      const nCategory: Category = {
        ...oldData,
        types: [...oldData.types, nType],
      };
      await updateCategory(nCategory);
    }
  };

  return (
    <>
      <FormAddCategory
        formValues={formValues}
        handleCategoryChange={handleCategoryChange}
        handleTypeCategoryChange={handleTypeCategoryChange}
        handleAddType={handleAddType}
        handleDeleteType={handleDeleteType}
        handleSubmit={handleSubmit}
        isValidating={isValidating}
      />

      {/* Edit + Delete */}
      <div className="shadow-md mt-4 border-2 bg-gray-50 py-2 px-4">
        <div className="grid grid-cols-3 gap-8 h-full">
          {categories?.map((cgory, idx) => (
            <div key={idx} className="px-8 py-2 border-2 shadow-lg">
              <h1 className="font-semibold text-base flex gap-3 items-center">
                <span>{cgory.categoryName}</span>
                <button
                  onClick={() => {
                    if (window.confirm("Bạn chắc chắn muốn xóa danh mục này")) {
                      deleteCategory(cgory._id as string);
                    }
                  }}
                  className=""
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-red-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    handleEditCategoryName(cgory);
                  }}
                  className=""
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    handleAddCategoryType(cgory);
                  }}
                  className=""
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-green-500 font-bold"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </h1>
              <ul className="ml-4">
                {cgory.types.map((c, i) => (
                  <li
                    key={i}
                    className="my-6 text-sm font-semibold flex items-center gap-3"
                  >
                    <span>
                      {i + 1}. {c}
                    </span>
                    <button
                      onClick={() => {
                        handleDeleteCategoryType(cgory, i);
                      }}
                      className=""
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => {
                        handleEditCategoryType(cgory, i);
                      }}
                      className=""
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div ref={bottomLiRef} className="mt-4"></div>
      </div>

      {isValidating && <Loading />}
    </>
  );
};

export default ManagerCategory;
