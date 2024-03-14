import Dictionary from "../models/Dictionary.js";

export const getAllItems = async (req, res, next) => {

    let dictItems;

    try {

        dictItems = await Dictionary.find();

    } catch (err) {
        return console.log(err);
    }

    if (!dictItems) {
        return res.status(404)
            .json({ message: "Items not found" });
    }

    return res.status(200)
        .json({ dictItems });

}

export const saveDictionaryItem = async (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Please enter item name" });
    }

    let existingItem;

    try {
        existingItem = await Dictionary.findOne({ name });
    } catch (err) {
        return console.log(err);
    }

    if (existingItem) {
        return res.status(400).json({ message: "Item already exist in repository" });
    }

    let index;

    const maxIndexDoc = await Dictionary.find().sort({ index: -1 }).limit(1);

    if (maxIndexDoc.length > 0) {
        const maxIndex = maxIndexDoc[0].index;
        index = maxIndex + 1;
    } else {
        console.log("No documents found in the Dictionary collection.");
        index = 1;
    }

    const item = new Dictionary({
        index,
        name
    });

    try {
        await item.save();
        
        return res.status(200).json(item);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
