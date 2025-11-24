import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());

// app.use((req, res, next) => {
//     console.log(`request path is ${req.path} and request method is ${req.method}`);
//     next();
// })

app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server running on port 5001");
    });
});

