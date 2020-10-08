const express = require('express');
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const passport = require('passport');

const users=require('./routes/api/users');
const profile=require('./routes/api/profile');
const post=require('./routes/api/post');
const app = express();
app.use(express.static('public')); // app.use-specify middleware as a callback function.

//Body parser middleware- access req.body.<whtever>
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//DB Config 
const config = {
    autoIndex: false,
    useNewUrlParser: true,
  };
const db=require('./config/keys').mongoURI;

//Connect to mngoDB
mongoose.connect(db,config).then(()=>console.log('MongoDB Connected')).catch(err=>console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

//Use Routes

app.use('api/users',users);
app.use('api/profile',profile);
app.use('api/post',post);

app.get("/", (req,res)=> res.send("Hello World"));

const port= process.env.PORT || 5000;

app.listen(port , () => console.log(`Server Running on port ${port}`));

