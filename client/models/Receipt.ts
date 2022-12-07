import mongoose from "mongoose";
import { Image, User } from "@/interfaces/index";

export interface SelectedProduct {
  _id?: string;
  title: string;
  description: string;
  size: string;
  price: number;
  images: Array<Image>;
  category: {
    categoryName: string;
    categoryType: string;
  };
  quantity: number;
}

interface Receipts {
  productCart: SelectedProduct[];
  userInfo: User;
  confirmed: boolean;
}

const receiptSchema = new mongoose.Schema<Receipts>(
  {
    productCart: {
      type: [],
      required: true,
    },
    userInfo: {
      type: {},
      required: true,
    },
    confirmed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Receipts ||
  mongoose.model("Receipts", receiptSchema);
