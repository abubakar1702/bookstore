import express from "express";
import 'dotenv/config';
import cors from "cors";
import booksRouter from "./routers/book.router.js"

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());


app.use("/api/books", booksRouter)

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
