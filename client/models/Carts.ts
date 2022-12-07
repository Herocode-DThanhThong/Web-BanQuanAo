import mongoose from "mongoose";
import { Image } from "@/interfaces/index";

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

interface Carts {
  productCart: SelectedProduct[];
  userId: string;
}

const cartsSchema = new mongoose.Schema<Carts>(
  {
    productCart: {
      type: [],
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Carts || mongoose.model("Carts", cartsSchema);
