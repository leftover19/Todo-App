const express = require('express');
const bodyParser = require('body-parser');
const app = express();
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
  // id : Number,
  Todo : [{
    title : String,
    description : String,
  }]
})

// Defining Mongoose Models
const User = mongoose.model('UserTodo' , userSchema)

mongoose.connect('mongodb://localhost:27017/Todo' )

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];
  if(token){
    // Verify Token
    jwt.verify(token, secret, (err, user) =>{
      if(err){
        return res.status(403).json({msg : 'Token has been manipulated'});
      }
      console.log('token is verified')
      req.user = user
      next();
    });
  }
  else{
    res.status(401);
  }
}

app.get('/profile' , authenticateJWT ,  (req, res) =>{
  const user =  req.user
  // console.log(req.user)
  res.status(200).json({msg : `Hello ${user.username} You have access to this protected route`,
  username : user.username
  });
});


app.use('/todo/:username', authenticateJWT); 

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


app.put('/saveTodo' , authenticateJWT ,  async (req, res) =>{
  const {username , todoTitle , todoDes } = req.body;
  try {
    const user = await User.findOne({username});
    const newTodo = {title : todoTitle , description : todoDes};
    await user.updateOne({$push : {Todo : newTodo}});
    return res.json({msg : "Todo added successfully"});
  }catch(err){
    return res.status(500).json({msg : "Internal server error my boi"});
  }
});


app.listen(port, () =>{
  console.log(`App listening on port ${port}`)
});


