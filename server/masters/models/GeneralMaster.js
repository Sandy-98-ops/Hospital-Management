import mongoose from "mongoose";

const { Schema } = mongoose;

const generalMasterSchema = new Schema({
    ParentIndex: {
        type: mongoose.Schema.Types.ObjectId, // Assuming ParentIndex is a reference to another document's ID
        ref: 'Dictionary' // Assuming Dictionary is the model name for the referenced document
    },
    index: {
        type: Number
    },
    name: {
        type: String
    },
    value: {
        type: String
    }
});

export default mongoose.model("GeneralMaster", generalMasterSchema);
