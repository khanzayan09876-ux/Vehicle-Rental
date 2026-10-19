
import mongoose from "mongoose";

let userSchema =  mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phonnumber: Number,
  Role: String,
});

let userModel = mongoose.model("user", userSchema);

export default userModel;