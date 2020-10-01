import mongoose from 'mongoose'

const userschema = mongoose.Schema({
  name: String,
  phone: String,
  password: String,
  lastseen: { type: Date, default: Date.now }
})

export default mongoose.model('users', userschema)