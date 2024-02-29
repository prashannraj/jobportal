import express from 'express'
import { registerController, loginController } from '../controllers/authController.js'

//router object

const router = express.Router();

//Routes
router.post('/register', registerController);

// Login || POST
router.post('/login', loginController);

//export
export default router