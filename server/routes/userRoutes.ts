import express from "express";
import { loginUser,getAllUsers } from "../controllers/userController";
import {registerUser, deleteUsers} from "../controllers/userController";

const router = express.Router()

router.get('/',getAllUsers)
// router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/register',registerUser)
router.delete('/delete/:id',deleteUsers)

export default router