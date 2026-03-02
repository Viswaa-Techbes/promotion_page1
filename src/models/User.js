import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    password: String,
    resetToken: String,
    resetTokenExpiry: Date,

    role: {
      type: String,
      default: "user", // admin or user
    },
  },

  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);