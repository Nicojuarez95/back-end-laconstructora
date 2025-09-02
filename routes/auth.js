import express from 'express';
import authController from '../controllers/authController.js';
import authenticateToken from '../middlewares/authenticate.js';
import authorize from '../middlewares/authorize.js';

let router = express.Router();

router.post('/register', authorize(['admin']), authController.register);

router.post('/login', authController.login);

export default router;