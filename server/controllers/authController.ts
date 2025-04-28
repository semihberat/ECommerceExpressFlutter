import { type Request, type Response, type NextFunction } from "express";
import { User } from "../models/User"; // Adjust the path to the correct location of the User model
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { transporter } from "../utils/mailTransporter";

const JWT_SECRET = process.env.JWT_SECRET || "undefinedKey";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = uuidv4();

    await User.create({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
      verificationToken,
      role: "customer",
    });

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email",
      html: `<h2>Welcome ${name}!</h2>
        <p>Verify your email:</p>
        <a href="${frontendUrl}/api/auth/verify-email?token=${verificationToken}">Click here</a>`,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(201)
      .json({ message: "User registered. Please verify your email." });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { token } = req.query;

    if (!token || typeof token !== "string") {
      res
        .status(400)
        .json({ message: "Verification token is missing or invalid" });
      return;
    }

    const user = await User.findOne({ where: { verificationToken: token } });

    if (!user) {
      res.status(400).json({ message: "Invalid verification token" });
      return;
    }

    user.isVerified = true;
    (user as any).verificationToken = null;

    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email }, raw: true });
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    if (!user.isVerified) {
      res.status(403).json({ message: "Email not verified" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
