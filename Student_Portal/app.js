import express from 'express';
import 'dotenv/config.js';
import cors from 'cors';
import studentRoutes from './routers/studentRoutes.js';

const app = express();

let corsOptions = {
    origin: process.env.ORIGIN
}

app.use(express.json());
app.use(cors(corsOptions));

try {
    app.listen(process.env.PORT || 4000, () => {
        console.log(`Listening to port ${process.env.PORT || 4000}...`);
    });
}catch (e) {
    console.log(e);
}

app.use('/student', studentRoutes);