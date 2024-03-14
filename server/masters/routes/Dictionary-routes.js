import express from 'express';
import { getAllItems, saveDictionaryItem } from "../controllers/Dictionary-Controller.js";


const router = express.Router();

router.get("/", getAllItems);
router.post("/saveDictionaryItem", saveDictionaryItem);

export default router;
