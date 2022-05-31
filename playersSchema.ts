import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    player: { type: String, required: true },
    points: { type: Number, required: false }
})

export default mongoose.model('playerSchema', schema)
