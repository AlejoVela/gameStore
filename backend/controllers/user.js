const User = require("../models/user");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
    if(!req.body.name || !req.body.email || !req.body.password)
        return res.status(401).send("Failed: There are empty fields");
    
    const existingUser = await User.findOne({email: req.body.email});
    if(existingUser) return res.status(401).send("Failed: User already exist");

    let hash = await bcrypt.hash(req.body.password, 10);

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
    });

    let result = await user.save();
    if(!result) return res.status(401).send("Failed: Faild to register user");
    try {
        let jwt = user.generateJWT();
        return res.status(201).send({ jwt });
    } catch (e) {
        return res.status(400).send("Failed: error with jwt response");
    }
};

const listUser = async (req, res) => {
    let user = await User.find({ name: new RegExp(req.params["name"], "i") });
    if(!user || user.length === 0) return res.status(400).send("Failed: There aren't Users register now");
    return res.status(400).send({ user });
};

module.exports = { registerUser, listUser };