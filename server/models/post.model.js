import {Schema, model} from 'mongoose';

const postSchema = new Schema({
    postedBy:{
        type: Schema.Types.ObjectId,
        ref: 'voter'
    },
    text:{
        type: String,
        trim: true,
        lowercase: true,
        maxLength: [1000, 'post should not contain more than 1000 characters']
    },
    image: {
        public_id:{
            type: String // cloudinary url
        },
        secure_url: {
            type: String, // cloudinary url
        }
    },
    likes :{
        type: Number,
        default: 0,
    },
    likedBy: [
        {
            type: Schema.Types.ObjectId,
            ref: 'voter',
        }
    ],
    dislikes :{
        type: Number,
        default: 0,
    },
    dislikedBy: [
        {
            type: Schema.Types.ObjectId,
            ref: 'voter',
        }
    ],
    comments:[
        {
            user:{
                type: Schema.Types.ObjectId,
                ref: 'voter',
                required: true
            },
            comment : {
                type: String
            },
            userProfilePic: {
                type: String, // cloudinary url
            }
        }
    ]
},{timestamps:true})

const Post = model('post', postSchema)
export default Post