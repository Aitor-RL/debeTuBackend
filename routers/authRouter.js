import { Router } from "express";
import * as authController from '../controllers/authController.js'

const authRouter = Router()
authRouter.post('/signin', authController.signIn)
authRouter.post('/login', authController.signIn)

export default authRouter
