// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Token, User } from "@/interfaces/index";
import verifyToken from "@/middleware/verifyToken";
import Users from "@/models/User";
import connectDB from "@/utils/connectDB";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
type Data = {
  data: User[] | null;
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  await connectDB();

  switch (method) {
    case "GET": {
      await getAllUser(req, res);
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

const getAllUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
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

    const isAdmin = user.role === "ADMIN";
    const isEmployee = user.role === "EMPLOYEE";

    if (!isAdmin && !isEmployee)
      return res.status(400).json({
        data: null,
        message: "Bạn không đủ quyền",
      });

    const users = await Users.find({});
    return res.status(200).json({
      data: users,
      message: "Lấy tất cả người dùng thành công",
    });
  } catch (error) {
    return res.json({
      data: null,
      message: "Server error",
    });
  }
};

export default handler;
