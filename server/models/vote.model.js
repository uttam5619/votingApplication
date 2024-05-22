import { Schema,model} from 'mongoose'

const VoteSchema = new Schema({
    voter: {
        type: Schema.Types.ObjectId,
        ref: Voter
    },
    candidate: {
        type: Schema.Types.ObjectId,
        ref: Candidate
    }
})

export default Vote = model('Vote', VoteSchema) 