import Post from "../models/post.model.js"
import Voter from "../models/voter.model.js"


const createPost = async (req, res)=>{
    try{
        const { text , image } = req.body
        if( text || image ){
            const post = await Post.create(req.body)
            if(!post) return res.status(400).json({success: false,message:'failed to create post'})
            await Post.save()
        }else{
            return res.status(400).json({success: false, message:'text or image is required'})
        }
    }catch(err){
        console.log(err.message)
        console.log(err)
        return res.status(400).json({success: false, message:err.message, data:err})
    }
    
}

const updatePost = async (req, res)=>{
    try{
        const user_id = req.user.id
        const user = await Voter.findById(user_id)
        if(!user) return res.status(404).json({success:false, message:'user not found'})
        // incompleted
    }catch(err){
        console.log(err.message)
        console.log(err)
        return res.status(400).json({success:false, message:err.message, data:err})
    }
}

const deletePost = async (req, res)=>{

}

const getAllPost = async (req, res)=>{
    try{
        const posts = await Post.find({})
        if(!posts) return res.status(404).json({success:false, message: 'posts not found'})
        return res.status(200).json({success:true, data:posts})
    }catch(err){
        console.log(err.message)
    }
}

const likePost = async (req, res)=>{
    try{
    const id = req.user.id
    const post_id = req.params.id

    const user = await Voter.findById(id)
    if(!user) return res.status(404).json({success:true, message:'user not exist'})

    const post = await Post.findById(post_id)
    if(!post) return res.status(404).json({success:true, message:'post not found'})
    post.likes = post.likes + 1
    post.likedBy.push(id)
    await post.save()
    }catch(err){
        console.log(err.message)
        console.log(err)
        return res.status(400).json({success:false,message:err.message,data:err})
    }

}

const dislikePost = async (req, res)=>{
    try{

        const id = req.user.id
        const post_id = req.params.id

        const user = await Voter.findById(id)
        if(!user) return res.status(404).json({success:true, message:'user not exist'})

        const post = await Post.findById(post_id)
        if(!post) return res.status(404).json({success:true, message:'post not found'})
        post.likes = post.likes + 1
        post.likedBy.push(id)
        await post.save()

    }catch(err){
        console.log(err.message)
        console.log(err)
        return res.status(400).json({success:true, message:err.message, daata:err})
    }
}

const comment= async (req, res)=>{
    const {id} = req.user
    const post_id = req.params.id
    const commentContent = req.body
    if (!commentContent.trim()) return res.status(400).json({success:true, message: 'comment has no content'})

    const post = await Post.findById(post_id)
    if(!post) return res.status(400).json({success:false, message:'post not found'})

    const user = await Voter.findById(id).select('-password')
    if(!user)return res.status(404).json({success:false, message:'user not found'})
    const { _id, userProfilePic} = user
    const comment = await Comment.create({
        commentedBy: _id,
        userProfilePic,
        comment: commentContent,
    })
    if (!comment) return res.status(400).json({success:false,message:'failed to comment'})
    await comment.save()
    
    post.comments.push(comment)
    await post.save()
}