import {mongo, mongoose} from 'mongoose';
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    cost: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cost',
        required: true,
    }],
    name: {
        type: String,
        required: true,  
    },
    password: {
        type: String,
        select: false,
        required: true,
    }
});

UserSchema.pre("save", async function (next) {
    if (this.password) {
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
    }
    next();
  });

const User = mongoose.model("Users", userSchema);

module.exports = User;

