const express = require('express');
const cors = require('cors');
const path = require('path');
const connectToDB = require('./db');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

// start express server
const app = express();
app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

// connect to DB
connectToDB();

// add middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({secret: 'xyz567', store: MongoStore.create(mongoose.connection), resave: false, saveUninitialized: false}));

// serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/public')));

// add routes
app.use('/api', require('./routes/ads.routes'));
app.use('/api', require('./routes/users.routes'));
app.use('/auth', require('./routes/auth.routes'));

// at any other link - serve React app
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use('*', (req, res) => {
  res.status(404).send({message: '404: Not Found'});
});

const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

if(NODE_ENV === 'production') {
  dbUri = 'url to remote db';
} else {
  dbUri = 'mongodb://localhost:27017/adBoardDB';
}

mongoose.connect(dbUri, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));