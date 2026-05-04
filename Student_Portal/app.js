import express from 'express';
import cors from 'cors';
import studentRoutes from './routers/studentRoutes.js'; // Notice the .js extension

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/students', studentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Student Portal running on port ${PORT}`);
});