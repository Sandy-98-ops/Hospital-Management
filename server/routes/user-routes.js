import express from "express";
import { getAllUsers, signup, getUSerByEmailAndPassword } from "../controllers/user-controller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/login", getUSerByEmailAndPassword);
router.post("/signup", signup);
export default router;