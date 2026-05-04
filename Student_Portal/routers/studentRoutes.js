import express from "express";
import * as studentPortal from "../controllers/studentController.js";

const router = express.Router();

router.get("/students", studentPortal.fetchStudents);

router.get("/students/:id", studentPortal.fetchStudentById);

export default router;