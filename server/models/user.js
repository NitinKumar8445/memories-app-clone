import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,   // prevents duplicate Google+local accounts with same email
    lowercase: true,
  },
  password: {
    type: String,
    // not required because Google accounts won’t have one
  },
  googleId: {
    type: String,
    // store Google’s user id (the "sub" field from payload)
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("User", userSchema);

