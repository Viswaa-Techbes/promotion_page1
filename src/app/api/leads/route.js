import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      password,
      service,
      pincode,
    } = body;

    if (!password || password.length < 6) {
      return Response.json({
        success: false,
        message: "Invalid password",
      });
    }

    const client = await clientPromise;
    const db = client.db("promoDB");

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.collection("leads").insertOne({
      name,
      email,
      phone,
      password: hashedPassword,
      service,
      pincode,
      role: "user",
      status: "Pending",
      createdAt: new Date(),
    });

    return Response.json({ success: true });

  } catch (err) {
    console.error("POST ERROR:", err);
    return Response.json({
      success: false,
      message: "Server error",
    });
  }
}


export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("promoDB");

    const leads = await db
      .collection("leads")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return Response.json({
      success: true,
      data: leads,
    });

  } catch (err) {
    console.error(err);
    return Response.json({
      success: false,
    });
  }
}