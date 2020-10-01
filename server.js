import express from 'express'
import mongoose from 'mongoose'
import Message from './dbMessage.js'
import Pusher from 'pusher'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: '1072411',
  key: '032aa90d5a031b998ee0',
  secret: '2a38ea8785bb65496d87',
  cluster: 'ap2',
  encrypted: true
});

app.use(express.json())
app.use(cors())

app.listen(port, () => console.log(`Listening on localhost:${port}`));
