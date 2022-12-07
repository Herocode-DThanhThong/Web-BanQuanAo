// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Product, Token, User } from "@/interfaces/index";
import verifyToken from "@/middleware/verifyToken";
import Products from "@/models/Product";
import connectDB from "@/utils/connectDB";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import Users from "@/models/User";
type Data = {
  data: Product | null;
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  await connectDB();

  switch (method) {
    case "GET": {
      await getDetailProduct(req, res);
      break;
    }

    case "PATCH": {
      await updateProduct(req, res);
      break;
    }

    case "DELETE": {
      await deleteProduct(req, res);
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

const getDetailProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  try {
    const product = await Products.findById(req.query.id);

    if (!product)
      return res
        .status(400)
        .json({ data: null, message: "Không tìm thấy sản phẩm" });

    return res.status(200).json({
      data: product,
      message: "Lấy tất cả sản phẩm thành công",
    });
  } catch (error) {
    return res.json({
      data: null,
      message: "Server error",
    });
  }
};

const updateProduct = async (
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
    const { title, description, size, price, images, category } = req.body;

    // const userInfo: any = await verifyToken(req, res);

    const isAdmin = user.role === "ADMIN";
    if (!isAdmin)
      return res.status(400).json({
        data: null,
        message: "Bạn không đủ quyền",
      });

    const updateProduct = await Products.findOneAndUpdate(
      { _id: id },
      {
        title,
        description,
        size,
        price,
        images,
        category,
      },
      { new: true }
    );

    return res.status(200).json({
      data: updateProduct,
      message: "Cập nhật sản phẩm thành công",
    });
  } catch (error) {
    return res.json({
      data: null,
      message: "Server error",
    });
  }
};

const deleteProduct = async (
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
      return res.status(200).json({
        data: null,
        message: "Bạn không đủ quyền",
      });

    const deleteProduct = await Products.findOneAndDelete(
      { _id: id },
      { new: true }
    );

    return res.status(200).json({
      data: deleteProduct,
      message: "Xóa sản phẩm thành công",
    });
  } catch (error) {
    return res.json({
      data: null,
      message: "Server error",
    });
  }
};

export default handler;
