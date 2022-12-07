import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import jwt from "jsonwebtoken";
import { Token, User } from "@/interfaces/index";
import Users from "@/models/User";

const verifyToken = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
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

    return { id: user._id, role: user.role };
  } catch (error) {
    // console.log(error);
    return res
      .status(400)
      .json({ data: null, message: "Token không hợp lệ hoặc hết hạn" });
  }
};

export default verifyToken;
