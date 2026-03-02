import clientPromise from "@/lib/mongodb";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email } = await req.json();

    const client = await clientPromise;
    const db = client.db("promoDB");

    const user = await db.collection("leads").findOne({ email });

    if (!user) {
      return Response.json({
        success: false,
        message: "User not found",
      });
    }

    // Generate secure token
    const token = crypto.randomBytes(32).toString("hex");

    await db.collection("leads").updateOne(
      { _id: user._id },
      {
        $set: {
          resetToken: token,
          resetTokenExpiry: Date.now() + 1000 * 60 * 15, // 15 mins
        },
      }
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Reset Your Password",
      html: `
        <h2>Password Reset</h2>
        <p>Click below link:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Expires in 15 minutes.</p>
      `,
    });

    return Response.json({
      success: true,
      message: "Reset link sent",
    });

  } catch (err) {
    console.error("FORGOT ERROR:", err);

    return Response.json({
      success: false,
      message: "Server error",
    });
  }
}