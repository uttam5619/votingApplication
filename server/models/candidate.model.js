import { model, Schema } from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const CandidateSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: [3, 'name should contain atleast 3 characters'],
        maxLength: [60, 'name should contain atmost 5 characters'],
    },
    email:{
        type: "string",
        required: true,
        trim: true,
        unique: true,
    },
    password:{
        type: "string",
        required: true,
        trim: true,
        lowercase: true,
        minLength: [6, 'password should contain atleast 5 characters'],
        maxLength: [100, 'password should contain atmost 100 characters'],
    },
    age:{
        type: "Number",
        required: true,
    },
    voted:{
        type: "boolean",
    },
    totalVotes: {
        type: 'Number',
        default: 0
    },
    votedBy: [
        {
            voter:{
                type: Schema.Types.ObjectId,
                ref: 'voter',
                required: true,
            },
            voted_At:{
                type: Date,
                default: Date.now()
            }
        }
    ]
},{timestamps: true})

CandidateSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

CandidateSchema.methods ={

    generateAccessToken : async function(){
        return await jwt.sign(
            {id:this._id, name:this.name, email:this.email},
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn:'20m'
            }
        )
    },

    comparePassword: async function(password){
        return await bcrypt.compare(password, this.password)
    }
}

const Candidate = model('candidate', CandidateSchema)
export default Candidate