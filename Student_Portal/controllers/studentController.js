import { getAllStudents } from '../services/studentService.js'; // Notice the .js extension

export const getStudentsList = async (req, res) => { // Export directly
    try {
        const token = req.token; 
        const students = await getAllStudents(token);

        res.status(200).json({
            success: true,
            data: students
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};