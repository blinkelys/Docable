import { Request, Response, NextFunction, Router } from "express";
import { isAuthorized } from "../middleware/auth";
import bcrypt from "bcrypt";
import User from "../models/userModel";

const router = Router();

// Login route
router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
  console.log(">>> LOGIN ROUTE HIT:", req.body); // ADD THIS LINE
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const formattedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: formattedEmail });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Store user in session
    req.session.userId = user._id.toString();

    res.json({
      message: "Logged in",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    next(err);
  }
});

// GET /auth/me
router.get("/me", isAuthorized, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.session.userId;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
});

// POST /auth/logout
router.post("/logout", (req: Request, res: Response, next: NextFunction) => {
  req.session.destroy((err) => {
    if (err) return next(err);

    res.clearCookie("sid", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.status(200).json({ message: "Logout successful" });
  });
});

export async function generateUser() {
  const email = process.env.ADMIN_EMAIL?.toLowerCase().trim();
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !username || !password) return;

  const existing = await User.findOne({ email });
  if (existing) {
    console.log("Admin already exists.");
    return;
  }

  const encryptedPassword = await bcrypt.hash(password, 12);
  await User.create({
    email,
    username,
    password: encryptedPassword,
  });

  console.log("Admin user created successfully");
}

export default router;