import { Category, Token, User } from "@/interfaces/index";
import verifyToken from "@/middleware/verifyToken";
import Categories from "@/models/Category";
import connectDB from "@/utils/connectDB";
import jwt from "jsonwebtoken";
import Users from "@/models/User";
import type { NextApiRequest, NextApiResponse } from "next";
type Data = {
  data: Category | null;
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  await connectDB();

  switch (method) {
    case "PATCH": {
      await updateCategory(req, res);
      break;
    }
    case "DELETE": {
      await deleteCategory(req, res);
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

const updateCategory = async (
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
    const { categoryName, types } = req.body;
    const isAdmin = user.role === "ADMIN";
    if (!isAdmin)
      return res.status(400).json({
        data: null,
        message: "Bạn không đủ quyền",
      });

    if (!categoryName) {
      return res.status(400).json({
        data: null,
        message: "Vui lòng nhập tên danh mục",
      });
    }

    const nCategory = await Categories.findOneAndUpdate(
      { _id: id },
      {
        categoryName,
        types,
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      data: nCategory,
      message: "Cập nhật danh mục thành công",
    });
  } catch (error) {
    return res.json({
      data: null,
      message: "Server error",
    });
  }
};

const deleteCategory = async (
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

    const dCategory = await Categories.findOneAndDelete(
      { _id: id },
      {
        new: true,
      }
    );

    return res.status(200).json({
      data: dCategory,
      message: "Xóa danh mục thành công",
    });
  } catch (error) {
    return res.json({
      data: null,
      message: "Server error",
    });
  }
};

export default handler;
