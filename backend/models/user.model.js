import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  age: String,
  comments:String,
});

const User = mongoose.model("User", userSchema);

export default User;