import { Receipt } from "@/interfaces/index";
import CardReceipt from "./CardReceipt";

interface ManagerReceiptProps {
  receipts: Receipt[] | null | undefined;
}

const ManagerReceipt = ({ receipts }: ManagerReceiptProps) => {
  return (
    <div className="">
      <div className="">
        {receipts?.map((item, idx) => (
          <CardReceipt receipt={item} key={item._id} />
        ))}
      </div>
      <div className="mt-8">{/* <Pagination /> */}</div>
    </div>
  );
};

export default ManagerReceipt;
