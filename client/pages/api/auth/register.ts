// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "@/utils/connectDB";
import { validRegister } from "@/utils/valid";
import Users from "@/models/User";
import brypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/interfaces/index";
type Data = {
  data: null | User;
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { method } = req;
  await connectDB();

  switch (method) {
    case "POST": {
      await register(req, res);
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

const register = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
  const { firstName, lastName, birthday, gender, email, password, phone } =
    req.body;

  const errMsg: string | undefined = validRegister(
    firstName,
    lastName,
    birthday,
    gender,
    email,
    phone,
    password
  );

  if (errMsg) return res.status(400).json({ data: null, message: errMsg });

  const user = await Users.findOne({ email });
  if (user)
    return res.status(400).json({ data: null, message: "Email đã tồn tại" });

  const passwordHash = await brypt.hash(password, 12);

  const newUser = new Users({
    firstName,
    lastName,
    birthday,
    gender,
    email,
    phone,
    password: passwordHash,
  });


    const nUser = await newUser.save();
    delete nUser._doc.password;

    return res.json({ data: nUser, message: "Tạo tài khoản thành công" });
  } catch (error) {
    //console.log(error);
    return res.json({ data: null, message: "Server error" });
  }
};

export default handler;
