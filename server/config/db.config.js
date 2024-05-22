import mongoose from 'mongoose';

const connectDB = ()=>{
    mongoose.connect('mongodb://localhost:27017/votingApplication')
    .then((e)=>{
        console.log(`application connected with database sucessfully ${e.connection.host}`)
    }).catch((err)=>{
        console.log(`failed to connect with database`)
        process.exit(1)
    })
}


export default connectDB