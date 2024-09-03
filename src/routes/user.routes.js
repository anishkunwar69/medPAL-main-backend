import { Router } from 'express';
import { signUpUser, signInUser, getAllUsersMed } from '../controllers/user.controllers.js';
import { authMiddleware } from '../middlewares/jwtVerify.middleware.js';
const router = Router();

router.route("/signup").post(signUpUser)
router.route("/signin").post(signInUser)
router.route("/getallmeds").get(authMiddleware,getAllUsersMed)

export default router; 