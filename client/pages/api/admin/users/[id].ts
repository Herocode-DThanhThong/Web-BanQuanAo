// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Token, User } from "@/interfaces/index";
import verifyToken from "@/middleware/verifyToken";
import Users from "@/models/User";
import connectDB from "@/utils/connectDB";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
type Data = {
  data: User | null;
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  await connectDB();

  switch (method) {
    case "PATCH": {
      await changeRoleUser(req, res);
      break;
    }

    case "DELETE": {
      await deleteUser(req, res);
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

const changeRoleUser = async (
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

    const { id } = req.query;
    // const userInfo: any = await verifyToken(req, res);

    const isAdmin = user.role === "ADMIN";
    if (!isAdmin)
      return res.status(400).json({
        data: null,
        message: "Bạn không đủ quyền",
      });

    const updateUser = await Users.findOneAndUpdate(
      { _id: id },
      {
        role: "EMPLOYEE",
      },
      { new: true }
    );

    return res.status(200).json({
      data: updateUser,
      message: "Thêm nhân viên thành công",
    });
  } catch (error) {
    return res.json({
      data: null,
      message: "Server error",
    });
  }
};

const deleteUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
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
    const { id } = req.query;
    // const userInfo: any = await verifyToken(req, res);

    const isAdmin = user.role === "ADMIN";
    if (!isAdmin)
      return res.status(200).json({
        data: null,
        message: "Bạn không đủ quyền",
      });

    const deleteUser = await Users.findOneAndDelete({ _id: id }, { new: true });

    return res.status(200).json({
      data: deleteUser,
      message: "Xóa người dùng thành công",
    });
  } catch (error) {
    return res.json({
      data: null,
      message: "Server error",
    });
  }
};

export default handler;
