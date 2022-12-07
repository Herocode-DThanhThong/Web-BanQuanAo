import { Category, Product } from "@/interfaces/index";
import { Checkbox } from "@mui/material";
import Radio from "@mui/material/Radio";
import Image from "next/image";
import { ChangeEvent, FormEvent } from "react";
interface FormAddProductProps {
  formValues: Product;
  images: Array<File>;
  handleUploadInputFile: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSizeChange: (
    e: ChangeEvent<HTMLInputElement>,
    numberIdx: number
  ) => void;
  categories: Category[] | null | undefined;
  handleRadioChange: (e: ChangeEvent<HTMLInputElement>) => void;
  deleteImage: (numberIdx: number) => void;
}
const FormAddProduct = ({
  formValues,
  categories,
  images,
  deleteImage,
  handleSubmit,
  handleInputChange,
  handleSizeChange,
  handleRadioChange,
  handleUploadInputFile,
}: FormAddProductProps) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-2">
        <div className="p-3 rounded-sm">
          <div className="mb-4 rounded-sm overflow-hidden">
            <input
              value={formValues.title}
              onChange={handleInputChange}
              name="title"
              type="text"
              className="w-full h-full py-2 px-2 text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Tên sản phẩm"
            />
          </div>
          <div className="my-4 rounded-sm overflow-hidden">
            <textarea
              value={formValues.description}
              onChange={handleInputChange}
              name="description"
              className="form-control h-[300px] block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Mô tả sản phẩm"
            ></textarea>
          </div>
          <div className="mt-4 flex gap-2 rounded-sm overflow-hidden">
            <div className="flex items-center">
              <Checkbox
                name=""
                checked={formValues.size[0] === "XS"}
                onChange={(e) => {
                  handleSizeChange(e, 0);
                }}
                value={"XS"}
              />
              <span className="font-semibold text-gray-600">XS</span>
            </div>
            <div className="flex items-center">
              <Checkbox
                checked={formValues.size[1] === "S"}
                onChange={(e) => {
                  handleSizeChange(e, 1);
                }}
                value={"S"}
              />
              <span className="font-semibold text-gray-600">S</span>
            </div>
            <div className="flex items-center">
              <Checkbox
                checked={formValues.size[2] === "M"}
                onChange={(e) => {
                  handleSizeChange(e, 2);
                }}
                value={"M"}
              />
              <span className="font-semibold text-gray-600">M</span>
            </div>
            <div className="flex items-center">
              <Checkbox
                checked={formValues.size[3] === "L"}
                onChange={(e) => {
                  handleSizeChange(e, 3);
                }}
                value={"L"}
              />
              <span className="font-semibold text-gray-600">L</span>
            </div>
            <div className="flex items-center">
              <Checkbox
                checked={formValues.size[4] === "XL"}
                value={"XL"}
                onChange={(e) => {
                  handleSizeChange(e, 4);
                }}
              />
              <span className="font-semibold text-gray-600">XL</span>
            </div>
            <div className="flex items-center">
              <Checkbox
                value={"XXL"}
                checked={formValues.size[5] === "XXL"}
                onChange={(e) => {
                  handleSizeChange(e, 5);
                }}
              />
              <span className="font-semibold text-gray-600">XXL</span>
            </div>
          </div>

          <div className="grid grid-cols-2">
            {categories?.map((cgory, idx) => (
              <div key={idx}>
                <div className="flex items-center" key={idx}>
                  <Radio
                    checked={
                      formValues.category.categoryName === cgory.categoryName
                    }
                    onChange={handleRadioChange}
                    key={idx}
                    value={cgory.categoryName}
                    name="categoryName"
                  />
                  <span className="text-sm font-semibold">
                    {cgory.categoryName}
                  </span>
                </div>
                <ul>
                  {cgory.types.map((type, idx) => (
                    <li key={idx} className="ml-4">
                      <Radio
                        checked={formValues.category.categoryType === type}
                        size="small"
                        key={idx}
                        value={type}
                        onChange={handleRadioChange}
                        name="categoryType"
                      />
                      <span className="text-sm text-gray-600 font-semibold">
                        {type}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="my-4 rounded-sm overflow-hidden">
            <input
              value={formValues.price}
              onChange={handleInputChange}
              name="price"
              type="number"
              className="w-full h-full py-2 px-2 text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Giá sản phẩm"
            />
          </div>
        </div>
        <div className="p-3">
          {/* input upload file */}
          <div className="relative">
            <button
              type="button"
              className="w-full h-full py-2 px-2 bg-white text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none block"
            >
              Upload hình ảnh
            </button>
            <input
              name="files"
              onChange={handleUploadInputFile}
              type="file"
              title="Select file"
              className="block absolute top-0 z-20 left-0 opacity-0 p-2 w-full text-sm border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none"
              multiple
              accept="image/*"
            />
          </div>

          <div className="grid grid-cols-4 gap-4 mt-4">
            {images.map((img, index) => (
              <div
                key={index}
                className={`relative ${
                  index === 0 ? "col-span-4" : "col-span-1"
                }`}
              >
                <Image
                  width={0}
                  height={0}
                  style={{
                    width: "100%",
                    height: index === 0 ? "320px" : "100px",
                    objectFit: "cover",
                  }}
                  src={URL.createObjectURL(img)}
                  alt=""
                  className="img-thumbnail rounded"
                />

                <button
                  type="button"
                  className="absolute -right-2 text-white font-bold bg-red-500 p-2 -top-2 rounded-full"
                  onClick={() => {
                    deleteImage(index);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className="block my-2 rounded-md text-white px-4 text-sm bg-indigo-600 p-2">
        Thêm sản phẩm
      </button>
    </form>
  );
};

export default FormAddProduct;
