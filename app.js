require('dotenv').config();
const express = require('express');
const app = express();

app.use('/images', express.static('public/images'));
app.use('/videos', express.static('public/videos'));
app.use('/documents', express.static('public/documents'));
app.use(express.json());

const userRouter = require('./routes/user.routes');
const userProfileRouter = require('./routes/userProfile.routes');

app.use('/api/v1/user', userRouter);
app.use('/api/v1/userProfile', userProfileRouter);

const { PORT = 3000 } = process.env;
app.listen(PORT, () => console.log('listening on port', PORT));
