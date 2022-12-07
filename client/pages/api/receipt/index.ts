import { Receipt, Token } from "@/interfaces/index";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from "@/interfaces/index";
import verifyToken from "@/middleware/verifyToken";
import Carts from "@/models/Carts";
import connectDB from "@/utils/connectDB";
import Users from "@/models/User";
import type { NextApiRequest, NextApiResponse } from "next";
import Receipts from "@/models/Receipt";
import jwt from "jsonwebtoken";

type Data = {
  data: null | Receipt[];
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  await connectDB();

  switch (method) {
    case "GET": {
      await getReceipts(req, res);
      break;
    }

    case "POST": {
      await addReceipt(req, res);
      break;
    }

    default: {
      return res.json({
        data: null,
        message: "Method not supported",
      });
    }
  }
};

const getReceipts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    // Verify token
    const token = req.headers["authorization"];
    if (!token) {
      return res
        .status(400)
        .json({ data: null, message: "Vui lòng đăng nhập" });
    }
    const accessToken = token.split(" ")[1];

    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as Token;

    if (!decoded) {
      return res
        .status(400)
        .json({ data: null, message: "Token không hợp lệ" });
    }

    const user: User | null = await Users.findOne({ _id: decoded.id });

    if (!user)
      return res
        .status(400)
        .json({ data: null, message: "Người dùng khôn tồn tại" });

    // End verify token
    // const userInfo: any = await verifyToken(req, res);

    // const user = await Users.findById({ _id: userInfo.id });

    const isAdmin = user.role === "ADMIN";
    const isEmployee = user.role === "EMPLOYEE";

    if (!isAdmin && !isEmployee)
      return res.status(400).json({
        data: null,
        message: "Bạn không đủ quyền",
      });

    const receipts = await Receipts.find().sort({ createdAt: "desc" });

    return res.json({
      data: receipts,
      message: "Lấy tất cả đơn hàng thành công",
    });
  } catch (error) {
    //console.log(error);
    return res.json({ data: null, message: "Server error" });
  }
};

const addReceipt = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data: Receipt | null;
    message: string;
  }>
) => {
  const { productCart } = req.body;

  try {
    // Verify token
    const token = req.headers["authorization"];
    if (!token) {
      return res
        .status(400)
        .json({ data: null, message: "Vui lòng đăng nhập" });
    }
    const accessToken = token.split(" ")[1];

    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as Token;

    if (!decoded) {
      return res
        .status(400)
        .json({ data: null, message: "Token không hợp lệ" });
    }

    const user: User | null = await Users.findOne({ _id: decoded.id });

    if (!user)
      return res
        .status(400)
        .json({ data: null, message: "Người dùng khôn tồn tại" });

    // End verify token
    const userInfo: any = await verifyToken(req, res);

    // const user = await Users.findById({ _id: userInfo.id });

    delete user._id;

    const newReceipt = new Receipts({
      productCart,
      userInfo: user,
      confirmed: false,
    });

    const nReceipt = await newReceipt.save();

    return res.json({
      data: nReceipt,
      message: "Đặt hàng thành công",
    });
  } catch (error) {
    //console.log(error);
    return res.json({ data: null, message: "Server error" });
  }
};

export default handler;
