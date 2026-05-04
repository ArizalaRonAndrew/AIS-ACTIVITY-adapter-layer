import axios from 'axios';

const ADAPTER_URL = process.env.ADAPTER_URL || 'http://localhost:5100/api';

export const getAllStudents = async (token) => { // Export directly
    try {
        const response = await axios.get(`${ADAPTER_URL}/auth/students`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to communicate with Adapter Layer';
        console.error(`[StudentService Error]: ${errorMessage}`);
        throw new Error(errorMessage);
    }
};