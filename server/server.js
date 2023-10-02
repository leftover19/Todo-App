const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require("fs");
const cors = require("cors");
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(cors());
const port = 3001;
const secret = 'yomama'

// Defining mongoose schema
const userSchema = new mongoose.Schema({
  username : String,
  password : String,
  id : Number,
  Todo : [{
    title : String,
    description : String,
  }]
})

// Defining Mongoose Models
const User = mongoose.model('UserTodo' , userSchema)

mongoose.connect('mongodb://localhost:27017/Todo' )
// console.log('control reaches here')

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if(authHeader){
    // Verify Token
    const token = authHeader;
    jwt.verify(token, secret, (err, user) =>{
      if(err){
        return res.sendStatus(403);
      }
      req.user = user
      next();
    });
  }
  else{
    console.log('error is here my friend')
    res.status(401);
  }
}

app.get('/profile' , authenticateJWT , (req, res) =>{
  res.json({
    username : req.user.username
  })
})


app.post('/signup' , async  (req, res) =>{
  const { username, password } = req.body;
  const user = await User.findOne({username ,  password })
  if(user){
    return res.status(403).json({ error: "Username already exists" });
  }
  else{
    const newUser = new User({username , password});
    await newUser.save();

    const token = jwt.sign({ username: newUser.username, id: newUser.id }, secret);
    res.status(201).json({msg : 'success' ,  token });
  }
});

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  console.log('control reaches here and we are fine');
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    req.user = decoded;
    next();
  });
};
app.use('/todo/:username', verifyToken);

app.post('/signin' , async (req, res) =>{
  const { username, password } = req.body;
  const user = await User.findOne({username , password});
  if(user){
    const token = jwt.sign({ username: user.username, id: user.id }, secret);
    res.status(201).json({msg : 'success' ,  token });
  }
  else{
    return res.status(404).json({ error: "User does not exists" });
  }
})


app.put('/saveTodo' ,  (req, res) =>{
  const {username , todoTitle , todoDes } = req.body;
  fs.readFile('database.json'  , 'utf8' , (err, data) =>{
    if(err) throw err;
    const users = JSON.parse(data);

    const user = users.find(u => u.username === username);

    if(!user){
      return res.status(401).json({error : "Inavlid Username"});
    }
    const newTodo = {title : todoTitle , description : todoDes};
    console.log('control reaches here and everything is fine')
    const updatedUsers = users.map((usr) =>{
      if(usr.username === username){
        
        console.log(usr) 
      }
    }) 
    console.log(updatedUsers);
    res.json({msg : user}).status(201); 
    //   fs.writeFile("database.json", JSON.stringify(updatedUsers), (err) => {
    //     if (err) throw err;
    //     res.status(201).json({msg : 'success'});
    //   });
  });
});


app.listen(port, () =>{
  console.log(`App listening on port ${port}`)
});


