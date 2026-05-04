import * as studentService from "../services/studentService.js";

export const fetchStudents = async (req, res) => {
    try {
        const students = await studentService.getStudents();
        res.json(students);
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch students from adapter"
        });
    }
};

export const fetchStudentById = async (req, res) => {
    try {
        const { id } = req.params;

        const student = await studentService.getStudentById(id);

        res.json(student);
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch student by ID"
        });
    }
};