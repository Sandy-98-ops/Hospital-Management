import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';

const schema = mongoose.schema;

const saltRounds = 10;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    genderIndex: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GeneralMaster'
    },
    gender: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
});

userSchema.pre('save', async function () {
    try {
        const user = this;

        if (user.isModified('password')) {
            user.password = await bcrypt.hash(user.password, saltRounds);
        }
    } catch (error) {
        throw error;
    }
});

export default mongoose.model("User", userSchema);
// users