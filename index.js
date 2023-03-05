import express from 'express'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import morgan from 'morgan'
import messageRouter from './routers/messageRouter.js'
import userRouter from './routers/userRouter.js'
import authRouter from './routers/authRouter.js'
import connectionRouter from './routers/connectionRouter.js'
import cors from 'cors'
import passport from 'passport'
import passportMiddleware from './middlewares/passport.js'
import { Configuration, OpenAIApi }  from "openai"

dotenv.config()
const app = express()
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(cors())


app.use(morgan('tiny'))

app.use(passport.initialize())
passport.use(passportMiddleware)

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

app.get('/', (req, res) => {
    res.status(200).send('Bienvenido al API de debeTu')
}) 

app.get('/menu', async (req, res) => {
    const {gender,weight,period,diseases} = req.query
    console.log(gender,weight,period,diseases)


    const prompt = `Genera un menú para  ${period} para una persona con las siguientes característiscas:\nGénero: ${gender} \nPeso: ${weight} \nEnfermedades: ${diseases} . \nMenú:`

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });

      res.status(200).json(response.data.choices[0].text)
   
}) 

app.use('/message', messageRouter)
app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/connection', connectionRouter)

async function main(){
    mongoose.set('strictQuery', true)
    await mongoose.connect(process.env.URL_DB);
    await app.listen(process.env.PORT)
    console.log('Servidor y base de datos encencidos')
}
main().catch(error => 
    console.error('Fallo al arrancar el servidor'+error)
)
//10.101.11.30