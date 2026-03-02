import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, newPassword } = body;

    if (!userId || !newPassword) {
      return Response.json({
        success: false,
        message: "Missing required fields",
      });
    }

    if (newPassword.length < 6) {
      return Response.json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // 🔐 OPTIONAL: JWT PROTECTION
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return Response.json({ success: false, message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return Response.json({ success: false, message: "Access denied" });
    }

    const client = await clientPromise;
    const db = client.db("promoDB");

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.collection("leads").updateOne(
      { _id: new ObjectId(userId) },
      { $set: { password: hashedPassword } }
    );

    return Response.json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (error) {
    console.error("ADMIN RESET ERROR:", error);
    return Response.json({
      success: false,
      message: "Server error",
    });
  }
}