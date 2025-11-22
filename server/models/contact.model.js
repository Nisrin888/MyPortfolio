import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
    required: "First name is required",
  },
  lastname: {
    type: String,
    trim: true,
    required: "Last name is required",
  },
  email: {
    type: String,
    trim: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: "Email is required",
  },
  message: {
    type: String,
    trim: true,
    required: "Message is required",
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Contact", ContactSchema);
