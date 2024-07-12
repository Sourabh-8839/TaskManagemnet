import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
const App = express();

App.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
  })
);
App.use(express.json({ limit: '16kb' }));

App.use(express.urlencoded({ extended: false, limit: '16kb' }));

// This is use for only file
App.use(express.static('public'));

App.use(cookieParser());

// Routes importing
import userRoute from './routes/user.routes.js';
import taskRoute from './routes/task.routes.js';

App.use('/api/v1/user', userRoute);
App.use('/api/v1/task', taskRoute);

export { App };
