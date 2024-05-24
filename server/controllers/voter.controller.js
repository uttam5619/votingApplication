import { emailValidation } from "../utils/validation.js"
import Voter from '../models/voter.model.js'
import Candidate from '../models/candidate.model.js'

const cookieOptions ={
    httpOnly: true,
    secure: true,
    maxAge: 7*24*60*60*1000
}

const signUp =async (req,res)=>{
    try{
        const { name, email, password, age } = req.body
        if( !name|| !email || !password || !age ){
            return res.status(400).json({success: false, message:'provide mandatory details'})
        }

        const isEmailValid= emailValidation(email)
        if( !isEmailValid ) return res.status(400).json({success: false, message:'invalid email'})
    
        const isVoterRegistered =await Voter.findOne({email})
        if(isVoterRegistered) return res.status(300).json({success:false, message: 'email already registered'})
        const voter = await Voter.create(req.body)
        if(!voter){
            return res.status(400).json({success:false, message:'failed to register the user'})
        }
        await voter.save()
        const token =  await voter.generateAccessToken()
        res.cookie('token', token, cookieOptions)
        const voterDetails = await Voter.findById(voter._id).select('-password')
        return res.status(200).json({success:true, data: voterDetails})
    }catch(err){
        console.log(err.message)
        console.log(err)
        return res.status(400).json({success:false,data: err})
    }
}

const signIn = async(req,res)=>{

    try{
        const { email,  password } = req.body
        if(!password || !email ){
            return res.status(200).json({success:false, message:'name and email is required'})
        }
        const isVoterExist = await Voter.findOne({email})
        if(!isVoterExist){
            return res.status(404).json({success:false, message:'voter not found'})
        }
        const voter = await Voter.findById(isVoterExist._id).select('-password')
        const token = await voter.generateAccessToken()
        res.cookie('token', token, cookieOptions)
        return res.status(200).json({success:true, message:'signIn successfully', data:voter})
    }catch(err){
        console.log(err.message)
        console.log(err)
        return res.status(400).json({success:false, data:err})
    }
}

const signOut =(req,res)=>{

}

const updateUser =(req,res)=>{

}

const findUser =async (req,res)=>{
    try{
        const {name} =req.body
        if(!name) return res.status(400).json({success:false, message:'name is required'})
        const voter = await Voter.find({name})
        if(!voter){
            return res.status(400).json({success:false, message: 'voter not found'})
        }
        return res.status(200).json({success:true, data:voter})
    }catch(err){
        console.log(err.message)
        console.log(err)
        return res.status(400).json({success:false,data:err})
    }
    
}

const deleteUser =(req,res)=>{

}

export {
    signIn,
    signUp,
    signOut,
    updateUser,
    findUser,
    deleteUser
}