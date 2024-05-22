import { config } from "dotenv"
config()
import app from './app.js'
import connectDB from "./config/db.config.js"

const PORT = process.env.PORT || 8085


app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
    connectDB()
})