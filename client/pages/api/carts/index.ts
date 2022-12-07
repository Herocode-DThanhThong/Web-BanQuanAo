// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Carts as Cart, Token, User } from "@/interfaces/index";
import verifyToken from "@/middleware/verifyToken";
import Carts from "@/models/Carts";
import connectDB from "@/utils/connectDB";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import Users from "@/models/User";

type Data = {
  data: null | Cart;
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { method } = req;
  await connectDB();

  switch (method) {
    case "GET": {
      await getCart(req, res);
      break;
    }
    case "PATCH": {
      await updateCart(req, res);
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

const getCart = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
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

    const productCart = await Carts.findOne({ userId: user._id });
    return res.json({
      data: productCart,
      message: "Lấy thông tin giỏ hàng thành công",
    });
  } catch (error) {
    //console.log(error);
    return res.json({ data: null, message: "Server error" });
  }
};

const updateCart = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const userInfo: any = await verifyToken(req, res);
    const carts = await Carts.findOneAndUpdate(
      { userId: userInfo.id },
      { productCart: req.body.productCart, userId: userInfo.id },
      {
        upsert: true,
        new: true,
      }
    );

    return res.json({
      data: carts,
      message: "Cập nhật giỏ hàng thành công",
    });
  } catch (error) {
    //console.log(error);
    return res.json({ data: null, message: "Server error" });
  }
};

export default handler;
