import mongoose, { Schema } from "mongoose";

const schema = mongoose.schema;

const dictionarySchema = new Schema({

    index: {
        type: Number
    },
    name: {
        type: String
    }
});

export default mongoose.model("Dictionary", dictionarySchema);