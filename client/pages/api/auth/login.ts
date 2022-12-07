// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "@/utils/connectDB";
import Users from "@/models/User";
import brypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/interfaces/index";
import { createAccessToken, createRefreshToken } from "@/utils/generateToken";
import Cookies from "cookies";

type Data = {
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  } | null;
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { method } = req;
  await connectDB();

  switch (method) {
    case "POST": {
      await login(req, res);
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

const login = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ data: null, message: "Không tìm thấy người dùng" });

    const isMatch = await brypt.compare(password, user.password);

    if (!isMatch)
      return res
        .status(400)
        .json({ data: null, message: "Mật khẩu không chính xác" });

    const access_token = createAccessToken({ id: user._id });
    const refresh_token = createRefreshToken({ id: user._id });

    // Save refreshToken to cookies
    const cookies = new Cookies(req, res, {
      secure: process.env.NODE_ENV !== "development",
    });

    delete user._doc.password;

    return res.json({
      message: "Đăng nhập thành công",
      data: { user, accessToken: access_token, refreshToken: refresh_token },
    });
  } catch (error) {
    return res.json({ data: null, message: "Server error" });
  }
};

export default handler;
