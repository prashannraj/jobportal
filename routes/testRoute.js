import express from 'express';
import {testPostController} from '../controllers/testController.js';

//route object

const router = express.Router();

//routes
router.post("/testPost", testPostController)

//export
export default router