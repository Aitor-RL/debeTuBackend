import * as usersServices  from '../services/usersServices.js'

const findAll = async (req, res) =>{
    try{
        //console.log('hola')
        //const userLogger = req.user
        const users = await usersServices.findAll()
        res.status(200).json(users)
    }catch(err){
        res.status(500).json({message: 'error al obtener los usuarios:'+err})
    }
}

const findById = async (req, res) =>{
    try{
        const userId = req.params.id
        const user = await usersServices.findById(userId)
        res.status(200).json(user)
    }catch(err){
        res.status(500).json({message: 'error al obtener el usuario:'+err})
    }
}

const save = async (req, res) => {
    try{
        const data = req.body
        const userSave = await usersServices.save(data)
        res.status(200).json(userSave)
    }catch(err){
        res.status(500).json({message: 'error al crear el nuevo usuario.'+err})
    }
}

const removeAll = async (req, res) => {
    try{
        await usersServices.removeAll()
        res.status(200).json({message: 'todos los usuarios borrados'})
    }catch(err){
        res.status(500).json({message: 'error al borrar todos los usuarios.'+err})
    }
}

const me = async (req, res) => {
    try{
        const userLogued = req.user
        res.status(200).json({userLogued})
    }catch(err){
        res.status(500).json({message: 'error al mostrar los datos del usuario.'+err})
    }
}




export {findAll, findById, save, removeAll, me}