import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "techbes_secret_key";

// CREATE TOKEN
export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

// VERIFY TOKEN
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}