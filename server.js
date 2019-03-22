const express = require('express');
const mongooose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');


const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = require('./config/keys').monggoURI;

//connnect to mongoDb
mongooose.connect(db)
.then(() => console.log('MongoDb connected'))
.catch(err => console.log(err));

//passport middleware

app.use(passport.initialize());

//passport config
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

//connnect to mongoDb

const port = process.env.PORT||3000;

app.listen(port,() => console.log(`server running on ${port}`));