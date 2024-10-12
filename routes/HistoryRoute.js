import express from "express";
import {
    getHistorys,
    getHistorysById
} from "../controllers/Historys.js"

const router = express.Router();

router.get('/historys', getHistorys);
router.get('/historys/:id',  getHistorysById);

export default router;