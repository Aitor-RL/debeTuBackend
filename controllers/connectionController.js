import * as usersServices  from '../services/usersServices.js'
import * as connectionServices  from '../services/connectionService.js'

const connectToCreditor = async (req, res) =>{
    try{
        const userCreditorEmail = req.params.email
        const userLoggedDeptor = req.user

        const userCreditor = await usersServices.findByEmail(userCreditorEmail)
        if(!userCreditor){
            res.status(404).json({message: 'No existe el usuario acredor'})
            return
        }
    
        //TODO: arreglar este fallo
        /*const connection = 
            await connectionServices.getConnectionFromUsersIds( 
                userCreditor._id, userLoggedDeptor._id)
        if(connection){
            res.status(409).json({message: 'Error, los usuarios ya están conectados'})
            return
        }*/
            

        const newConnection = await connectionServices.connectToCreditor(
            userCreditor._id, userLoggedDeptor._id)
              
        res.status(200).json(newConnection)
    }catch(err){
        res.status(500).json({message: 'error al conectarse con un acredor:'+err})
    }
}

const disconnectToCreditor = async (req, res) =>{
    try{
        const userLoggedDeptor = req.user
        const userCreditorEmail = req.params.email
        const userCreditor = usersServices.findByEmail(userCreditorEmail)
        if(!userCreditor)
            req.status(404).json({message: 'No existe el usuario acredor'})
        

        const connection = 
            await connectionServices.getConnectionFromUsersIds( 
                userCreditor._id, userLoggedDeptor._id)
        if(!connection)
                res.status(404).json({message: 'No existe la conexión entre esos usuarios'})
        const updatedConnecton = 
            await connectionServices.disconnectToCreditor(connection._id)
        res.status(200).json(updatedConnecton)
    }catch(err){
        res.status(500).json({message: 'error al desconectarse de un acreedor:'+err})
    }
}



async function getMyDebtors(req, res) {
    try {
      const userLoguedId = req.user._id // Usuario acreedor (loguado en el sistema)
      const debts = await connectionServices.getDebtorsByIdCreditor(userLoguedId)
      res.status(200).json(debts)
    } catch (err) {
      res.status(500).json({mensaje: 'error al obtener todos mis deudores:' + err})
    }
  }
  
  async function getMyCreditors(req, res) {
    try {
      const userLoguedId = req.user._id // Usuario deudor (loguado en el sistema)
      const creditors = await connectionServices.getCreditorsByIdDebtor(userLoguedId)
      res.status(200).json(creditors)
    } catch (err) {
        res.status(500).json({mensaje: 'error al obtener todos mis acreedores:' + err})
    }
  }
  
async function addDebt(req, res) {
    const debtData = req.body
    const idConnection = req.params.idConnection
    try {
        const debtSave = await connectionServices.addDebt(idConnection, debtData)
        res.status(200).json(debtSave)
    } catch (err) {
        res.status(500).json({mensaje: 'error al obtener guardar la deuda:' + err})
    }
}

async function removeDebt(req, res) {
    //const idDebt = req.body
    const idConnection = req.params.idConnection
    const idDebt = req.params.idDebt
    try {
        const debtRemoved = await connectionServices.removeDebt(idConnection, idDebt)
        res.status(200).json(debtRemoved)
    } catch (err) {
        res.status(500).json({mensaje: 'error al obtener borrar la deuda:' + err})
    }
}

export { connectToCreditor, disconnectToCreditor, getMyDebtors, getMyCreditors, addDebt, removeDebt }
