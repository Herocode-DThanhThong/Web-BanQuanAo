// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Category, Token, User } from "@/interfaces/index";
import Categories from "@/models/Category";
import Users from "@/models/User";
import connectDB from "@/utils/connectDB";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
type Data = {
  data: Category[] | null;
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  await connectDB();

  switch (method) {
    case "GET": {
      await getAllCategories(req, res);
      break;
    }

    case "POST": {
      await addCategory(req, res);
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

const getAllCategories = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  try {
    const categories = await Categories.find({});

    return res.status(200).json({
      data: categories,
      message: "Lấy tất cả danh mục thành công",
    });
  } catch (error) {
    return res.json({
      data: null,
      message: "Server error",
    });
  }
};

const addCategory = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data: Category | null;
    message: string;
  }>
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

    const newCategory = new Categories({
      categoryName,
      types,
    });

    const nCategory = await newCategory.save();

    return res.status(200).json({
      data: nCategory,
      message: "Thêm danh mục thành công",
    });
  } catch (error) {
    //console.log(error);
    return res.json({
      data: null,
      message: "Server error",
    });
  }
};

export default handler;
