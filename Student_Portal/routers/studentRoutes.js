import express from 'express';
import { getStudentsList } from '../controllers/studentController.js'; // Notice the .js extension
import authHandler from '../middleware/authHandler.js'; // Notice the .js extension

const router = express.Router();

router.get('/', authHandler, getStudentsList);

export default router; // Changed from module.exports