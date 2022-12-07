import { Receipt } from "@/interfaces/index";
import verifyToken from "@/middleware/verifyToken";
import connectDB from "@/utils/connectDB";
import type { NextApiRequest, NextApiResponse } from "next";
import { Token, User } from "@/interfaces/index";

import Receipts from "@/models/Receipt";
import Users from "@/models/User";
import jwt from "jsonwebtoken";

type Data = {
  data: Receipt | null;
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  await connectDB();

  switch (method) {
    case "PATCH": {
      await updateReceipt(req, res);
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

const updateReceipt = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
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

    const receipts = await Receipts.findOneAndUpdate(
      { _id: req.query.id },
      {
        confirmed: true,
      },
      { new: true }
    );

    return res.json({
      data: receipts,
      message: "Xác nhận đơn hàng thành công",
    });
  } catch (error) {
    //console.log(error);
    return res.json({ data: null, message: "Server error" });
  }
};
export default handler;
