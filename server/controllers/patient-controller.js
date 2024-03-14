import GeneralMaster from "../masters/models/GeneralMaster.js";
import Patient from "../models/Patient.js";

export const getAllPatients = async (req, res, next) => {

    let patients;

    try {

        patients = await Patient.find();

    } catch (err) {
        return console.log(err);
    }

    if (!patients) {
        return res.status(404)
            .json({ message: "No Patients Found" });
    }

    return res.status(200)
        .json({ patients });
}

export const getPatient = async (req, res, next) => {

    const { mobile } = req.body;
    let patient;

    try {

        patient = await Patient.findOne({ mobile });

    } catch (err) {
        return console.log(err);
    }

    if (!patient) {
        return res.status(404)
            .json({ message: "Patient Not Found!" })
    }

    return res.status(400)
        .json({ patient });
}

export const savePatient = async (req, res, next) => {

    const { firstName, lastName, fullName, mobile, genderIndex, occupationIndex, email, image } = req.body;

    let existingPatient;

    try {
        existingPatient = await Patient.findOne({ mobile });

        if (existingPatient) {
            return res.status(400)
                .json({ message: "Patient Already Exists" });
        }

        let genderObject, genderIndexVal, genderVal;

        if (genderIndex) {
            let index = genderIndex;
            genderObject = await GeneralMaster.findOne({ index });
        }

        if (genderObject) {
            genderIndexVal = genderObject._id;
            genderVal = genderObject.get("value");
        } else {
            genderIndexVal = 0;
            genderVal = '';
        }

        let occupationObject, occupationIndexVal, occupationVal;

        if (occupationIndex) {
            let index = occupationIndex;
            occupationObject = await GeneralMaster.findOne({ index });
        }

        if (occupationIndex) {
            occupationIndexVal = occupationObject._id;
            occupationVal = occupationObject.get("value");
        } else {
            occupationIndexVal = 0;
            occupationVal = '';
        }

        const patient = new Patient({
            firstName,
            lastName,
            fullName,
            mobile,
            genderIndex: genderIndexVal,
            gender: genderVal,
            occupationIndex: occupationIndexVal,
            occupation: occupationVal,
            email,
            image
        });

        if (!patient.firstName) {
            return res.status(400)
                .json({ message: "Please Mention First Name!" })
        }

        if (!patient.gender) {
            return res.status(400)
                .json({ message: "Please Mention Gender!" });
        }

        if (!patient.mobile) {
            return res.status(400)
                .json({ message: "Please Mention Patient Mobile No." })
        }


        await patient.save();

        return res.status(200)
            .json({ patient });

    } catch (err) {
        return console.log(err);
    }
}

export const updatePatient = async (req, res, next) => {
    const { firstName, lastName, fullName, mobile, genderIndex, occupationIndex, email, image } = req.body;

    try {
        if (!mobile) {
            return res.status(400)
                .json({ message: "Please enter MRN /Mobile No." });
        }

        let patient = await Patient.findOne({ mobile });

        if (!patient) {
            return res.status(404)
                .json({ message: "Patient not found" });
        }

        // Update patient fields
        patient.firstName = firstName || patient.firstName;
        patient.lastName = lastName || patient.lastName;
        patient.fullName = fullName || patient.fullName;
        patient.email = email || patient.email;
        patient.image = image || patient.image;

        // Update gender
        if (genderIndex) {
            const genderObject = await GeneralMaster.findOne({ index: genderIndex });
            if (genderObject) {
                patient.genderIndex = genderObject._id;
                patient.gender = genderObject.value;
            }
        } else {
            patient.genderIndex = 0;
            patient.gender = '';
        }

        // Update occupation
        if (occupationIndex) {
            const occupationObject = await GeneralMaster.findOne({ index: occupationIndex });
            if (occupationObject) {
                patient.occupationIndex = occupationObject._id;
                patient.occupation = occupationObject.value;
            }
        } else {
            patient.occupationIndex = 0;
            patient.occupation = '';
        }

        // Save the updated patient
        await patient.save();

        return res.status(200)
            .json({ message: "Patient updated successfully", data: patient });

    } catch (err) {
        console.error(err);
        return res.status(500)
            .json({ message: "Internal server error" });
    }
}
