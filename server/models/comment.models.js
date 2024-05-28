import { Schema, model } from 'mongoose'

const commentSchema = new Schema({
    commentedBy: {
        type: Schema.Types.ObjectId,
        ref: 'voter',
        required: true
    },
    comment:{
        type: String,
        trim: true,
        lowercase: true,
        maxLength: [500, 'the comment should be longer than 500 characters']
    },
    userProfilePic: {
        type: String,
    },
    repliedTo:{
        type : Schema.Types.ObjectId,
        ref: 'commemt',
        default: null,
    },
    replies: [
        {
            commentedBy: {
            type: Schema.Types.ObjectId,
            ref:'voter',
            },
            comment: {
                type: String,
            },
            repliedTo:{
                type: Schema.Types.ObjectId,
                ref: 'comment'
            },
            userProfilePic: {
                type: String,
            },
        }
    ]
},{timestamps:true})

const Comment = model('comment', commentSchema)
export default Comment