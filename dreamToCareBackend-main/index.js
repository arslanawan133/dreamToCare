import 'dotenv/config'; // Yeh line sab se upar honi chahiye

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import userRouter from './routes/user.js';
import postRoutes from './routes/posts.js';
import queryRoutes from './routes/query.js';
import notificationRoutes from './routes/notofications.js';
import locationsRoutes from './routes/liveDastarKhawan.js';
import { delSocket, setIO, setSocket } from './controllers/socketIO.js';
import { MongoMemoryServer } from 'mongodb-memory-server';
// import ngoRoutes from './routes/ngo.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/', userRouter);
app.use('/posts', postRoutes);
app.use('/posts', queryRoutes);
app.use('/', notificationRoutes);
app.use('/', locationsRoutes);
// app.use('/', ngoRoutes);

const httpServer = http.createServer(app);

const io = setIO(httpServer);
io.on("connection", (socket) => {
  if (mongoose.Types.ObjectId.isValid(socket.handshake.query?.userId)) {
    setSocket(socket);
    socket.on('disconnect', () => {
      delSocket(socket);
    });
  };
});

const PORT = process.env.PORT || 8000;

(async () => {
  try {
    let CONNECTION_URL = process.env.MONGODB_URI;
    if (!CONNECTION_URL) {
      console.log('No MONGODB_URI provided — starting in-memory MongoDB');
      const mongod = await MongoMemoryServer.create();
      CONNECTION_URL = mongod.getUri();
    }

    await mongoose.connect(CONNECTION_URL, { w: 'majority', retryWrites: true, useNewUrlParser: true, useUnifiedTopology: true });
    httpServer.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`));
  } catch (error) {
    console.log(`${error} did not connect`);
    process.exit(1);
  }
})();
