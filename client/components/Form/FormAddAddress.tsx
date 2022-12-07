import { Address } from "@/interfaces/index";
import { ChangeEvent, Dispatch, FormEvent } from "react";
interface FormAddAddressProps {
  addressValue: Address;
  setAddressValue: Dispatch<React.SetStateAction<Address>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}
const FormAddAddress = ({
  addressValue,
  setAddressValue,
  handleSubmit,
}: FormAddAddressProps) => {
  const handChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressValue({
      ...addressValue,
      [name]: value,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-w-[300px] shadow-md mt-2 border-2 bg-gray-50"
    >
      <div className="p-3 rounded-sm">
        <div className="border-2 my-4 py-2 px-2 rounded-sm overflow-hidden">
          <input
            name="receiverName"
            type="text"
            className="bg-transparent w-full"
            placeholder="Tên người nhận"
            value={addressValue.receiverName}
            onChange={handChange}
          />
        </div>
        <div className="border-2 my-4 py-2 px-2 rounded-sm overflow-hidden">
          <input
            type="text"
            name="gender"
            className="bg-transparent w-full"
            placeholder="Giới tính"
            value={addressValue.gender}
            onChange={handChange}
          />
        </div>
        <div className="border-2 my-4 py-2 px-2 rounded-sm overflow-hidden">
          <input
            type="text"
            name="phone"
            className="bg-transparent w-full"
            placeholder="Số điện thoại"
            value={addressValue.phone}
            onChange={handChange}
          />
        </div>
        <div className="border-2 py-2 px-2 rounded-sm overflow-hidden">
          <input
            name="address"
            type="text"
            className="bg-transparent w-full"
            placeholder="Địa chỉ"
            value={addressValue.address}
            onChange={handChange}
          />
        </div>
      </div>

      <button className="block mx-auto my-2 rounded-md text-white px-4 text-sm bg-sky-600 p-2">
        Thêm
      </button>
    </form>
  );
};

export default FormAddAddress;
