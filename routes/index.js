import express from 'express'
import UserRouter from './userRouter.js'
import RegistroRouter from './registroRouter.js' // <-- 1. IMPORTA EL NUEVO ROUTER

let router = express.Router();

router.use('/users', UserRouter);
router.use('/registros', RegistroRouter); // <-- 2. USA EL NUEVO ROUTER

export default router