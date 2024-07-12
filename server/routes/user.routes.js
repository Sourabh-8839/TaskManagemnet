import express from 'express';
import {
  logOutUser,
  loginUser,
  registerUser,
} from '../controller/user.controller.js';
import { isAdminRoute, protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/registerUser').post(registerUser);
router.route('/login').post(loginUser);

export default router;
