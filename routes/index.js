import express from "express";
import { getUsers, Register, Login, Logout, deleteUser, updateUser, getUsersById } from "../controllers/Users.js"
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get('/users/list', verifyToken, getUsers);
router.get('/users/detail/:id', getUsersById);
router.post('/register', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.patch('/users/edit/:id', updateUser);
router.delete('/users/delete/:id', deleteUser);

export default router;