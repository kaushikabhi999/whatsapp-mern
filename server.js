import express from 'express'
import mongoose from 'mongoose'
import Message from './dbMessage.js'
import Pusher from 'pusher'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: '1072411',
  key: '032aa9***********98ee0',
  secret: '2a38*********65496d87',
  cluster: 'ap2',
  encrypted: true
});

app.use(express.json())
app.use(cors())

const db_name = process.env.MONGOOSE_DB_NAME || 'whatsapp-db'
const db_username = process.env.MONGOOSE_USERNAME || 'whatsapp'
const db_password = process.env.MONGOOSE_PASSWORD || 'whatsapp@999'
const connection_url = `mongodb+srv://${db_username}:${db_password}@cluster0.gef4k.mongodb.net/${db_name}?retryWrites=true&w=majority`;
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection;
db.once('open', () => {
  console.log('connected')
  const msgCollection = db.collection('messagecontents')
  const changeStream = msgCollection.watch();
  changeStream.on('change', (change) => {
    if (change.operationType === 'insert') {
      const msgDetails = change.fullDocument;
      pusher.trigger('message', 'inserted',
        {
          name: msgDetails.name,
          message: msgDetails.message,
          received: msgDetails.received,
          timstamp: msgDetails.timstamp
        }
      )
    }
  })
})

app.listen(port, () => console.log(`Listening on localhost:${port}`));
