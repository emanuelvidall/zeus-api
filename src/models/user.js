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

const User = mongoose.model("Users", userSchema);

module.exports = User;

