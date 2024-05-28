import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

const voterSchema = new Schema({
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
    userProfilePic :{
        public_id: {
            type: String, 
        },
        secure_url: {
            type: String, // cloudinary_url
        }
    },
    age:{
        type: "Number",
        required: true,

    },
    role:{
        type: "string",
        enum: ['voter', 'admin'],
        default: 'voter',
    },
    passcode:{
        type: "string",
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    hasVoted:{
        type: "boolean",
        default: false,
    },
    votedFor:{
        type: Schema.Types.ObjectId,
        ref: 'candidate'
    }
},{timestamps: true})

voterSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

voterSchema.pre('save', async function(next){
    if(!this.isModified('passcode')) return next()
    this.passcode = await bcrypt.hash(this.passcode, 10)
    next()
})

voterSchema.methods ={

    generateAccessToken: async function(){
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

const Voter = model('voter', voterSchema)
export default Voter