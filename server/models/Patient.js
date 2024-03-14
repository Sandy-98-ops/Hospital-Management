import mongoose, { Mongoose } from "mongoose";
import GeneralMaster from "../masters/models/GeneralMaster.js";

const { Schema } = mongoose;

const patientSchema = new Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    fullName: {
        type: String
    },
    mobile: {
        type: Number,
        required: true
    },
    genderIndex: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GeneralMaster'
    },
    gender: {
        type: String,
        required: true
    },
    occupationIndex: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GeneralMaster'
    },
    occupation: {
        type: String
    },
    email: {
        type: String
    },
    image: {
        type: String
    }
});

// patientSchema.pre('save', async function () {
//     try {
//         const patient = this;

//         if (patient.isNew('genderIndex') || patient.isModified('genderIndex')) {
//             let index = genderIndex;

//             if (index) {
//                 const genderObject = await GeneralMaster.findOne({ index });

//                 if (genderObject) {
//                     patient.genderIndex = genderObject._id;
//                     patient.gender = genderObject.value;
//                 }
//             }

//         }

//         if (patient.isNew('occupationIndex') || patient.isModified('occupationIndex')) {
//             let index = occupationIndex;

//             if (index) {
//                 const occupationObject = await GeneralMaster.findOne({ index });

//                 if (occupationObject) {
//                     patient.occupationIndex = occupationObject._id;
//                     patient.occupation = occupationObject.value;
//                 }
//             }

//         }
//     } catch (err) {
//         return console.log(err);
//     }
// });


export default mongoose.model("Patient", patientSchema);
