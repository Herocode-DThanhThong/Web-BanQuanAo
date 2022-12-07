import jwt from "jsonwebtoken";
import { createAccessToken } from "../../../utils/generateToken";
import { NextApiRequest, NextApiResponse } from "next";
import Users from "@/models/User";
import connectDB from "@/utils/connectDB";
import { User } from "@/interfaces/index";
type Data = {
  data: {
    accessToken: string;
    user: User;
  } | null;
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await connectDB();

  try {
    const rf_token = req.cookies.refreshToken;
    if (!rf_token)
      return res
        .status(400)
        .json({ data: null, message: "Bạn chưa đăng nhập" });

    const result = jwt.verify(
      rf_token,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as { id: string };

    if (!result)
      return res
        .status(400)
        .json({ data: null, message: "Token hết hạn hoặc không hợp lệ" });

    const user = await Users.findById(result.id);
    if (!user)
      return res
        .status(400)
        .json({ data: null, message: "Người dùng không tồn tại" });

    const access_token = createAccessToken({ id: user._id });

    delete user._doc.password;
    return res.json({
      data: {
        accessToken: access_token,
        user,
      },
      message: "Refresh token thành công",
    });
  } catch (err: any) {
    return res.status(500).json({
      data: null,
      message: "Server error",
    });
  }
};

export default handler;
