import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {

  const { plan } = await req.json();

  const amount =
    plan === "lifetime"
      ? 100
      : 99900;

  const order = await razorpay.orders.create({
    amount,
    currency: "INR",
  });

  return Response.json({ order });
}