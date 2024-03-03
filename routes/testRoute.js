import express from 'express';
import {testPostController} from '../controllers/testController.js';
import userAuth from '../middelwares/authmiddleware.js';

//route object

const router = express.Router();

//routes
router.post("/testPost", userAuth, testPostController)

//export
export default router