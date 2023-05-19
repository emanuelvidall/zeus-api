import {mongo, mongoose} from 'mongoose';
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,  
    },  
    email: {
        type: String,
        required: true,  
    },
    password: {
        type: String,
        required: true,
    }
});

userSchema.pre("save", async function (next) {
    if (this.password) {
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
    }
    next();
  });

const User = mongoose.model("Users", userSchema, 'users');

export default User;

