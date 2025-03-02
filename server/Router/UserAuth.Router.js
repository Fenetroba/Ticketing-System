import express from 'express';
import { Login, Logout, SignUp,CheckAuth } from '../Controller/UserAuth.conterller.js';
import authMiddleware from '../Middleware/Auth.middleware.js';
const router=express.Router();

router.post("/signup",SignUp)
router.post("/login",Login)
router.post("/logout",Logout)
router.get("/check-auth",authMiddleware, CheckAuth)




export default router;