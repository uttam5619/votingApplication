import Candidate from "../models/candidate.model.js"
import { emailValidation } from "../utils/validation.js"

const registerCandidate =async (req,res)=>{
    try{
        const { name, email, password, age } = req.body
        if( !name || !email || !password || !age ){
            return res.status(400).json({success: false, message:'provide all mandatory details'})
        }

        const isEmailVerified = emailValidation(email)
        if( !isEmailVerified ){
            return res.status(400).json({success: false, message:'Invalid Email'})
        }

        const isCandidateRegistered = await Candidate.findOne({email})
        if(isCandidateRegistered){
            return res.status(400).json({success: false, message:'already registered'})
        }
        const candidate = await Candidate.create({name, email, password, age})
        if(!candidate){
            return res.status(400).json({success: false, message:'failed to register candidate'})
        }
        await candidate.save()
        const candidateDetails = await Candidate.findById(candidate._id).select('-password')
        return res.status(201).json({success:true , message:'successfully registered', data: candidateDetails})
    }catch(err){
        console.log(err.message)
        return res.status(400).json({success: false, message: err.message})
    }
}

const findCandidate = async (req,res)=>{
    try{
    const {name} =req.body
        if(!name) return res.status(400).json({success: false, message: 'name is required'})
        const candidate = await Candidate.find({name})
        if(!candidate) return res.status(400).json({success: false, message: 'candidate not found'})
        return res.status(200).json({success: true, data: candidate})
    }catch(err){
        console.log(err.message, err)
        return res.status(400).json({success: false, data:err})
    }
}

const updateCandidate = async (req,res)=>{

}

const removeCandidate = async (req,res)=>{

}


const casteVote = async (req,res)=>{

    const candidateId =req.params.id

    const user = req.user
    const voter = await Voter.findById(user._id).select('-password passcode')
    if(!voter) return res.status(404).json({success:false, message: 'user not found'})
    if(voter.hasVoted === True) return res.status(400).json({success:false, message:'permission denied'})
    
    const candidate = await Candidate.findById(candidateId)
    if(!candidate) return res.status(404).json({success:false, message: 'Candidate not found'})
    await Candidate.findByIdAndUpdate(req.user._id, {$push: {votedBy: id}})
    res.status(200).json({success:true, message: 'vote casted successfully'})
}


export {
    registerCandidate,
    updateCandidate,
    findCandidate,
    removeCandidate,
    casteVote
}