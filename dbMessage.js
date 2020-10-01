import mongoose from 'mongoose'

const whatsappschema = mongoose.Schema({
  name: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
  received: Boolean
})

export default mongoose.model('messagecontents', whatsappschema)