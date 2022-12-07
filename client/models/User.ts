import mongoose, { Model } from "mongoose";

interface Address {
  default: boolean;
  receiverName: string;
  gender: string;
  phone: string;
  address: string;
}

interface User {
  firstName: string;
  lastName: string;
  birthday: string;
  gender: string;
  email: string;
  password: string;
  phone: string;
  role: "ADMIN" | "EMPLOYEE" | "CUSTOMER";
  addressList: Address[];
}

const userSchema = new mongoose.Schema<User>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "CUSTOMER",
    },
    addressList: [],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
