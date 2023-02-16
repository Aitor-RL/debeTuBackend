import { Router } from "express";
import * as messageController from '../controllers/messageController.js'

const messageRouter = Router()
// listar todos los mensajes
messageRouter.get('/', messageController.findAll)
// añadir un nuevo mensaje
messageRouter.post('/', messageController.save)

export default messageRouter