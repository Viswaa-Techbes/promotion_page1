import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { token, password } = await req.json();

    const client = await clientPromise;
    const db = client.db("promoDB");

    const user = await db.collection("leads").findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return Response.json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    await db.collection("leads").updateOne(
      { _id: user._id },
      {
        $set: {
          password: hashed,
          resetToken: null,
          resetTokenExpiry: null,
        },
      }
    );

    return Response.json({
      success: true,
      message: "Password reset successful",
    });

  } catch (err) {
    console.error("RESET ERROR:", err);

    return Response.json({
      success: false,
      message: "Server error",
    });
  }
}