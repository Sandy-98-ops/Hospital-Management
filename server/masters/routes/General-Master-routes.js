import express from 'express';
import { getAllMasterItems, saveMasterItem } from "../controllers/General-Master-Controller.js";

const router = express.Router();

router.get("/", getAllMasterItems);
router.post("/saveMasterItem", saveMasterItem);

export default router;


