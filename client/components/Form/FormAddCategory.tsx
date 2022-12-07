import React from "react";
import { ChangeEvent, FormEvent, useState } from "react";

interface ICategory {
  categoryName: string;
  types: Array<string>;
}
interface FormAddCategoryProps {
  formValues: ICategory;
  handleCategoryChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleTypeCategoryChange: (
    e: ChangeEvent<HTMLInputElement>,
    numberIdx: number
  ) => void;
  handleAddType: () => void;
  handleDeleteType: (numberIdx: number) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  isValidating: boolean;
}

const FormAddCategory = ({
  formValues,
  handleAddType,
  handleCategoryChange,
  handleDeleteType,
  handleSubmit,
  handleTypeCategoryChange,
  isValidating,
}: FormAddCategoryProps) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="shadow-md mt-2 border-2 bg-gray-50"
    >
      <div className="p-3 rounded-sm">
        <div className="border-2 my-2 py-2 px-2 rounded-sm overflow-hidden">
          <input
            value={formValues.categoryName}
            name="categoryName"
            onChange={handleCategoryChange}
            type="text"
            className="bg-transparent w-full h-full"
            placeholder="Danh mục"
          />
        </div>
        {/* Type */}
        {formValues.types.map((t, i) => (
          <div key={i} className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                handleDeleteType(i);
              }}
              className=""
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-red-500 hover:opacity-70"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="border-2 my-2 py-2 px-2 rounded-sm overflow-hidden flex-1">
              <input
                value={t}
                onChange={(e) => {
                  handleTypeCategoryChange(e, i);
                }}
                type="text"
                className="bg-transparent w-full h-full"
                placeholder="Loại sản phẩm"
              />
            </div>
          </div>
        ))}

        {/* Button add type */}
        <button
          type="button"
          disabled={isValidating}
          onClick={() => {
            handleAddType();
          }}
          className="cursor-pointer w-full hover:opacity-90 bg-gray-50 ml-4 shadow-xl py-2 px-4 flex justify-center rounded-md border-dashed border-4 border-indigo-500"
        >
          <p className="border-b-[3px] border-teal-500 text-black">
            Thêm loại sản phẩm
          </p>
        </button>
      </div>

      <button
        disabled={isValidating}
        className="bg-indigo-500 capitalize shadow-lg mx-auto mb-2 px-4 py-2 text-white font-semibold rounded-md shadow-indigo-500/50 block"
      >
        Thêm danh mục
      </button>
    </form>
  );
};

export default FormAddCategory;
