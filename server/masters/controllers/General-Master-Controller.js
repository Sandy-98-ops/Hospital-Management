import Dictionary from "../models/Dictionary.js";
import GeneralMaster from "../models/GeneralMaster.js";

export const getAllMasterItems = async (req, res, next) => {

    let masterItems;

    try {

        masterItems = await GeneralMaster.find();
    } catch (err) {
        return console.log(err);
    }

    if (!masterItems) {
        return res.status(404)
            .json({ message: "Master Items not found" });
    }

    return res.status(200)
        .json({ masterItems });
}

export const saveMasterItem = async (req, res, next) => {
    const { name, value, dictionaryIndex } = req.body;

    if (!name && !value) {
        return res.status(400).json({ message: "Please Enter Item name and Value" });
    }

    try {
        const existingItem = await GeneralMaster.findOne({ name, value });

        if (existingItem) {
            return res.status(400).json({ message: "Item already exists in the repository" });
        }

        let index = dictionaryIndex;
        const parentIndexDoc = await Dictionary.findOne({ index });

        if (!parentIndexDoc) {
            return res.status(404).json({ message: "The dictionary index entered is not found" });
        }

        index = null;

        const parentIndexId = parentIndexDoc._id;

        const maxIndexDoc = await GeneralMaster.find().sort({ index: -1 }).limit(1);

        if (maxIndexDoc.length > 0) {
            const maxIndex = maxIndexDoc[0].index;
            index = maxIndex + 1;
        } else {
            console.log("No documents found in the GeneralMaster collection.");
            index = 1;
        }

        let masterItem = new GeneralMaster({
            ParentIndex: parentIndexId,
            index,
            name,
            value
        });

        await masterItem.save();

        return res.status(200).json(masterItem);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
