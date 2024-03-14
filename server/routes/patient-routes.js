import express from 'express';
import { getAllPatients, savePatient, getPatient, updatePatient } from '../controllers/patient-controller.js';

const router = express.Router();

router.get("/", getAllPatients);
router.post("/savePatient", savePatient);
router.get("/getPatient", getPatient);
router.put("/updatePatient", updatePatient);

export default router;