import express from 'express'
import postsRoutes from './routes/posts.routes.js'
import cors from 'cors'
import morgan from "morgan";
import path, { join } from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';


const app = express()

app.use(cors());

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../client/build')));

// Routes
app.use("/api", postsRoutes);

app.get('*', (req, res)=>{
    res.sendFile(join(__dirname, '../client/build/index.html'))
})

export { app };