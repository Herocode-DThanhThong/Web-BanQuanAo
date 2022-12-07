import { model, Schema } from "mongoose";

interface Image {
  public_id: string;
  url: string;
}

interface Product {
  title: string;
  description: string;
  size: Array<string>;
  price: number;
  images: Array<Image>;
  category: {
    categoryName: string;
    categoryType: string;
  };
}

const productSchema = new Schema<Product>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    size: {
      type: [],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [],
      required: true,
    },
    category: {
      type: {},
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<Product>("Product", productSchema);
