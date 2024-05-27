import { Schema, model } from 'mongoose'

const commentSchema = new Schema({
    commentedBy: {
        type: Schema.Types.ObjectId,
        ref: 'voter',
    },
    comment:{
        type: String,
        trim: true,
        lowercase: true,
        maxLength: [500, 'the comment should be longer than 500 characters']
    },
    
},{timestamps:true})