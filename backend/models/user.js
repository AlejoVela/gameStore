const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    date: { type: Date, default: Date.now},
    userStatus: {type: Boolean, default: true}
});

userSchema.methods.generateJWT = function () {
    return jwt.sign({
        _id: this._id,
        name: this.name,
        email: this.email,
        iat: moment().unix(),
    },
        process.env.S3CR3T_K3Y
    );
};

const user = mongoose.model("user", userSchema );
module.exports = user;