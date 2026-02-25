import { ObjectId } from "mongodb";

// CREATE LEAD
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const {
      name,
      email,
      phone,
      password,
      service,
      pincode,
    } = await req.json();

    if (!password || password.length < 6) {
      return Response.json({
        success: false,
        message: "Invalid password",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const client = await clientPromise;
    const db = client.db("promoDB");

    await db.collection("leads").insertOne({
      name,
      email,
      phone,
      password: hashedPassword,
      service,
      pincode,
      status: "Not Active",
      createdAt: new Date(),
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("POST ERROR:", err);
    return Response.json({ success: false });
  }
}


// GET ALL LEADS
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("promoDB");

    const leads = await db
      .collection("leads")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return Response.json({ success: true, data: leads });
  } catch (err) {
    console.error("GET ERROR:", err);
    return Response.json({ success: false });
  }
}


// UPDATE STATUS
export async function PATCH(req) {
  try {
    const { id, status } = await req.json();

    const client = await clientPromise;
    const db = client.db("promoDB");

    await db.collection("leads").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    return Response.json({ success: true });
  } catch (err) {
    console.error("PATCH ERROR:", err);
    return Response.json({ success: false });
  }
}


// // DELETE LEAD
// export async function DELETE(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const id = searchParams.get("id");

//     const client = await clientPromise;
//     const db = client.db("promoDB");

//     await db.collection("leads").deleteOne({
//       _id: new ObjectId(id),
//     });

//     return Response.json({ success: true });
//   } catch (err) {
//     console.error("DELETE ERROR:", err);
//     return Response.json({ success: false });
//   }
// }