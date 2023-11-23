import { User } from "@/models/user";
import { connectDB, cookieSetter, generateToken } from "@/utils/features";

const { asyncError, errorHandler } = require("@/middlewares/error");

import bcrypt from "bcrypt";

const handler = asyncError(async (req, res) => {
  if (req.method !== "POST")
    return errorHandler(res, 400, "Only Post method allowed");

  const { email, password } = req.body;

  if (!email || !password)
    return errorHandler(res, 400, "Please enter all fields");

  await connectDB();

  const user = await User.findOne({ email }).select("+password");

  if (!user) return errorHandler(res, 400, "Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return errorHandler(res, 400, "Invalid email or password");

  const token = generateToken(user._id);

  cookieSetter(res, token, true);

  res.status(200).json({
    success: true,
    message: "Login Successfully",
    user,
  });
});

export default handler;
