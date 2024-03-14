import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user-routes.js'
import patientRouter from './routes/patient-routes.js';
import dictionaryRouter from "./masters/routes/Dictionary-routes.js";
import generalMasterRouter from "./masters/routes/General-Master-routes.js";

const app = express();
app.use(express.json());

app.use("/api/user", router);
app.use("/api/patients", patientRouter);
app.use("/api/dictionary", dictionaryRouter);
app.use("/api/generalMaster", generalMasterRouter);

mongoose
    .connect(
        'mongodb+srv://<username>:<password>@cluster0.xxokbdq.mongodb.net/HospitalManagement'
    )
    .then(() => app.listen(5000))
    .then(() =>
        console.log("Connected to DB and listening to port 5000"))
    .catch((err) =>
        console.log(err));
