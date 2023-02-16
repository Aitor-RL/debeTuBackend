import { Router } from "express";
import passport from "passport";
import * as userController from '../controllers/userController.js'
const userRouter = Router()
// listar todos los usuarios
userRouter.get('/',userController.findAll)
userRouter.get('/me', 
    passport.authenticate('jwt', {session:false}),
    userController.me)
// listar un usuario a partir de su id
// http://localhost:3000/user/9548uhgy945h9
userRouter.get('/:id', userController.findById)
// añadir un nuevo usuario
userRouter.post('/', userController.save)
// borrar todos los usuarios
userRouter.delete('/', 
    passport.authenticate('jwt', {session:false}),
    userController.removeAll)


export default userRouter