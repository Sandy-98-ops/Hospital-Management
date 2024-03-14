import mongoose, { Schema } from "mongoose";
import user from "./user";

const schema = mongoose.schema;

const staffSchema = new Schema({
    user: {
        type: user
    },
    code: {
        type: String
    },
    type: {
        type: Number
    },
    speciality: {
        type: Number
    }
});

export default mongoose.model("Staff", staffSchema);