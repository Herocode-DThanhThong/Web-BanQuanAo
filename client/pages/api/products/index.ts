// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Product, Token, User } from "@/interfaces/index";
import verifyToken from "@/middleware/verifyToken";
import Products from "@/models/Product";
import connectDB from "@/utils/connectDB";
import jwt from "jsonwebtoken";
import Users from "@/models/User";

import type { NextApiRequest, NextApiResponse } from "next";
type Data = {
  data: Product[] | null;
  pagination?: {
    limit: number;
    page: number;
    total: number;
  };
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  await connectDB();

  switch (method) {
    case "GET": {
      await getAllProducts(req, res);
      break;
    }

    case "POST": {
      await addProduct(req, res);
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

const getAllProducts = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { page, createdAt, price, categoryType, search } = req.query;

  try {
    // Pagination
    const pageNumber = Number(page) * 1 || 1;
    const limit = 10;
    const skip = (pageNumber - 1) * limit;
    const priceNumber = price ? Number(price) : null;
    const createdAtNumber = createdAt ? Number(createdAt) : null;

    const sort: Record<string, any> = {
      price: priceNumber,
      createdAt: createdAtNumber,
    };

    for (let key in sort) {
      if (!sort[key]) delete sort[key];
    }

    let queryData: any = categoryType
      ? { "category.categoryType": categoryType }
      : {};

    if (search) {
      queryData = {
        ...queryData,
        title: { $regex: search },
      };
    }

    const products = await Products.find(queryData)
      .sort(sort)
      .limit(limit)
      .skip(skip);

    const totalProduct = await Products.find(queryData).count();

    return res.status(200).json({
      data: products,
      pagination: {
        limit: 10,
        page: pageNumber,
        total: totalProduct,
      },
      message: "Lấy tất cả sản phẩm thành công",
    });
  } catch (error) {
    //console.log(error);
    return res.json({
      data: null,
      message: "Server error",
    });
  }
};

const addProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
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
    const { title, description, size, price, images, category } = req.body;
    const isAdmin = user.role === "ADMIN";
    if (!isAdmin)
      return res.status(400).json({
        data: null,
        message: "Bạn không đủ quyền",
      });

    const newProduct = new Products({
      title,
      description,
      size,
      price,
      images,
      category,
    });

    const nProduct = await newProduct.save();

    return res.status(200).json({
      data: nProduct,
      message: "Thêm sản phẩm mới thành công",
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
