import GeneralMaster from "../masters/models/GeneralMaster.js";
import User from "../models/user.js";

export const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        return console.log(err);
    }

    if (!users) {
        return res.status(404)
            .json({ message: "No User Found" });
    }

    return res.status(200)
        .json({ users });
}

export const getUSerByEmailAndPassword = async (req, res, next) => {

    const { email, password } = req.body;

    if (!email) {
        return res.status(400)
            .json({ message: "Please enter Email ID" });
    }

    if (!password) {
        return res.status(400)
            .json({ message: "Please enter Password" });
    }

    let user;

    try {
        user = await User.findOne({ email }).and({ password });
    } catch (err) {
        return console.log(err);
    }

    if (!user) {
        return res.status(404)
            .json({ message: "User not Found / Entered Credentials are incorrect" });
    }

    if (user) {
        return res.status(400)
            .json({ user });
    }
}

export const signup = async (req, res, next) => {
    const { name, genderIndex, email, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        return console.log(err);
    }

    if (existingUser) {
        return res
            .status(400)
            .json({ message: "User is already exist" });
    }

    let genderObject, genderIndexVal, genderVal;

    if (genderIndex) {
        let index = genderIndex;
        genderObject = await GeneralMaster.findOne({ index });

        if(genderObject){
            genderIndexVal = genderObject._id;
            genderVal = genderObject.value;
        }
    }

    const user = new User({
        name,
        genderIndex : genderIndexVal,
        gender : genderVal,
        email,
        password
    });

    try {
        await user.save();

    } catch (err) {
        return console.log(err);
    }

    return res.status(201).json({ User });
}
