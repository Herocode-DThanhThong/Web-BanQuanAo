import { useReceipt } from "@/hooks/use-receipt";
import { Receipt } from "@/interfaces/index";
import { formatPrice } from "@/utils/formatPrice";
import { getDefaultAddress } from "@/utils/getDefaultAddress";
import Image from "next/image";
interface CardReceiptProps {
  receipt: Receipt;
}
const CardReceipt = ({ receipt }: CardReceiptProps) => {
  const { updateReceipt } = useReceipt();
  const addressList = receipt.userInfo.addressList;
  return (
    <div className="p-2 border rounded-md mt-4">
      <div className="border-b">
        <h1 className="font-semibold pb-2">
          <span className="text-gray-500">Họ tên người nhận: </span>
          {getDefaultAddress(addressList)?.receiverName}
        </h1>
        <h1 className="font-semibold pb-2">
          <span className="text-gray-500">Address: </span>
          {getDefaultAddress(addressList)?.address}
        </h1>
        <h1 className="font-semibold pb-2">
          <span className="text-gray-500">Phone: </span>
          {getDefaultAddress(addressList)?.phone}
        </h1>
      </div>

      <div className="max-h-[400px] overflow-scroll">
        {receipt.productCart.map((rp, idx) => (
          <div key={idx} className="flex justify-between w-full my-4">
            <div className="flex gap-4">
              <div className="w-[100px] h-[100px] rounded-md overflow-hidden">
                <Image
                  src={rp.images[0].url}
                  priority
                  width="0"
                  height="0"
                  sizes="100vw"
                  alt="avatar"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 2,
                    //   objectFit: "contain",
                  }}
                />
              </div>
              <div className="">
                <h1 className="text-base font-semibold">{rp.title}</h1>
                <p className="text-coffee-600 text-sm my-2">
                  <span className="text-gray-600">Quantity : </span>
                  {rp.quantity}
                </p>
                <p className="text-coffee-600 text-sm my-2">
                  <span className="text-gray-600">Size : </span>
                  {rp.size}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-base text-red-500">
                {formatPrice(rp.price * rp.quantity)} VND
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t py-4">
        <div className="">
          <button
            onClick={() => {
              if (window.confirm("Bạn chắc chắn muốn xác nhận đơn hàng này?")) {
                updateReceipt(receipt._id as string);
              }
            }}
            style={{
              backgroundColor: receipt.confirmed ? "#ccc" : "",
            }}
            className="bg-green-500 px-4 py-1 text-sm text-white rounded-sm mr-4 hover:opacity-80"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardReceipt;
