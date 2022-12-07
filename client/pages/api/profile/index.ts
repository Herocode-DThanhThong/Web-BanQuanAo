// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Token, User } from "@/interfaces/index";
import verifyToken from "@/middleware/verifyToken";
import Users from "@/models/User";
import connectDB from "@/utils/connectDB";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
type Data = {
  data: null | User;
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { method } = req;
  await connectDB();

  switch (method) {
    case "GET": {
      await getProfile(req, res);
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

const getProfile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
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

    delete user.password;

    return res.json({
      data: user,
      message: "Lấy thông tin người dùng thành công",
    });
  } catch (error) {
    //console.log(error);
    return res.json({ data: null, message: "Server error" });
  }
};

export default handler;
