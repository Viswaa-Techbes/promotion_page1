import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { identifier, password } = await req.json();

    const client = await clientPromise;
    const db = client.db("promoDB");

    // Find by email OR phone
    const user = await db.collection("leads").findOne({
      $or: [
        { email: identifier },
        { phone: identifier },
      ],
    });

    if (!user) {
      return Response.json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return Response.json({
        success: false,
        message: "Wrong password",
      });
    }

    // JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role || "user",
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return Response.json({
      success: true,
      token,
      role: user.role || "user",
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return Response.json({
      success: false,
      message: "Server error",
    });
  }
}