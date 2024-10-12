import express from "express";
import {
    getGroups,
    getGroupById,
    createGroup,
    updateGroup,
    deleteGroup
} from "../controllers/Groups.js"

const router = express.Router();

router.get('/groups/list', getGroups);
router.get('/groups/list/:id', getGroups);
router.get('/groups/detail/:id',  getGroupById);
router.post('/groups/add', createGroup);
router.patch('/groups/edit/:id', updateGroup);
router.delete('/groups/delete/:id', deleteGroup);

export default router;