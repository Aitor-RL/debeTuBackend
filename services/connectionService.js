import { Connection } from "../models/connection.js";



const connectToCreditor = async(userIdCreditor, userIdDeptor)=>{
    const newConnection = new Connection()
    newConnection.creditor=userIdCreditor
    newConnection.debtor=userIdDeptor
    newConnection.debts=[]
    return await newConnection.save()
}

const disconnectToCreditor = async(idConnection)=>
    await Connection.findByIdAndUpdate(idConnection, {active:false})

const getConnectionFromUsersIds= async(userIdCreditor, userIdDeptor) => 
    await Connection.find(
        {deptor: userIdDeptor, creditor:userIdCreditor}
    )

const getDebtorsByIdCreditor = async (myIdUserLogged) => await Connection.find({ creditor: myIdUserLogged }).populate('debtor').populate('debts')

const getCreditorsByIdDebtor = async (myIdUserLogged) => await Connection.find({ debtor: myIdUserLogged }).populate('creditor').populate('debts')

const addDebt = async (idConnection, debtData) =>{
    const connection = await Connection.findById(idConnection)
    connection.debts.push(debtData)
    return await connection.save()
}

const removeDebt = async (idConnection, idDebt) =>{
    const connection = await Connection.findById(idConnection)
    connection.debts.pull({_id:idDebt})
    return await connection.save()
}

export {connectToCreditor, disconnectToCreditor, getConnectionFromUsersIds, getDebtorsByIdCreditor, getCreditorsByIdDebtor, addDebt,removeDebt}