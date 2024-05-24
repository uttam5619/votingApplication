import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import appRouter from './routes/base.route.js';


const app = express();

app.use(cookieParser())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/votingApp', appRouter)

export default app
