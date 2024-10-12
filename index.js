import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";
import DeviceRoute from "./routes/DeviceRoute.js";
import HistoryRoute from "./routes/HistoryRoute.js";
import GroupRoute from "./routes/GroupRoute.js";

dotenv.config();
const app = express();

try {
    await db.authenticate();
    console.log('Database Connected...');
} catch (error) {
    console.error(error);
}

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use(DeviceRoute);
app.use(HistoryRoute);
app.use(GroupRoute);


app.listen(5000, () => 
    console.log('Server running on port 5000'));
