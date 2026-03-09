import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://techbes.co.in",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(data) {
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
    },
  });
}

export async function OPTIONS() {
  return new Response(null, { headers: corsHeaders });
}

export async function POST(req) {
  try {
    const { identifier, password } = await req.json();

    const client = await clientPromise;
    const db = client.db("promoDB");

    const user = await db.collection("leads").findOne({
      $or: [
        { email: identifier },
        { phone: identifier },
      ],
    });

    if (!user) {
      return json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return json({
        success: false,
        message: "Wrong password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role || "user",
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return json({
      success: true,
      token,
      role: user.role || "user",
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);

    return json({
      success: false,
      message: "Server error",
    });
  }
}