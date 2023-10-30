import express from "express";
import { Register, Login, Logout } from "../controllers/UsersController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken, serverOn } from "../controllers/RefreshToken.js";

const router = express.Router()

router.get('/', serverOn)
router.get('/usersBE', verifyToken)
router.get('/tokenBE', refreshToken)
router.post('/usersBE', Register)
router.post('/loginBE', Login)
router.delete('/logoutBE', Logout)

export default router