import express from "express";
import {
    getDevices,
    getDeviceById,
    createDevice,
    updateDevice,
    deleteDevice
} from "../controllers/Device.js"
import { verifyToken } from "../middleware/VerifyToken.js"

const router = express.Router();

router.get('/devices/list', getDevices);
router.get('/devices/list/:userId', getDevices);
router.get('/devices/:id',  getDeviceById);
router.post('/devices/add', createDevice);
router.patch('/devices/edit/:id', updateDevice);
router.delete('/devices/delete/:id', deleteDevice);

export default router;