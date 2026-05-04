import axios from "axios";

const ADAPTER_URL = "http://localhost:4000/auth"; // Adapter Layer

export const getStudents = async () => {
    const response = await axios.get(`${ADAPTER_URL}/students`);
    return response.data;
};

export const getStudentById = async (id) => {
    const response = await axios.get(`${ADAPTER_URL}/students/${id}`);
    return response.data;
};