import mongoose from "mongoose";

interface Category {
  categoryName: string;
  types: Array<string>;
}

const categorySchema = new mongoose.Schema<Category>(
  {
    categoryName: {
      type: String,
      required: true,
    },
    types: {
      type: [],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Category ||
  mongoose.model("Category", categorySchema);
