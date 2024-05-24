import { Schema,model} from 'mongoose'

const VoteSchema = new Schema({
    voter: {
        type: Schema.Types.ObjectId,
        ref: 'voter'
    },
    candidate: {
        type: Schema.Types.ObjectId,
        ref: 'candidate'
    }
})

export default Vote = model('vote', VoteSchema) 