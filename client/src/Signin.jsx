import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {Card, Typography} from "@mui/material";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signin() {

  const [email , setEmail] = useState('')
  const [password , setPassword] = useState(null);
  const navigate = useNavigate();
  return <div> 
    <div style={{
      paddingTop: 150,
      marginBottom: 10,
      display: "flex",
      justifyContent: "center"
    }}>
      <Typography variant={"h6"}>
        Welcome Back. Sign in below
      </Typography>
    </div>
    <div style={{display: "flex", justifyContent: "center"}}>
      <Card varint={"outlined"} style={{width: 400, padding: 20}}>
      <TextField fullWidth={true} id="outlined-basic"label="Email"variant="outlined"
      onChange={(e) => {
        setEmail(e.target.value);
      }}
    />
        <br/><br/>
<TextField
      fullWidth={true}
      id="outlined-basic"
      label="Password"
      variant="outlined"
      type={"password"}
      onChange={(e) =>{
        setPassword(e.target.value);
      }}
    />

        <br/><br/>
<Button 
      size={"large"} 
      variant="contained"
      onClick={() =>{
        function callback2(data) {
          localStorage.setItem("token" , data.token)
          navigate(`/todo/${email}`)
          window.location.reload()
        }
        function callback1(res) {
          res.json().then(callback2)
        }
        fetch("http://localhost:3001/signin", {
          method: "POST",
          body : JSON.stringify({
            username : email,
            password: password
          }),
          headers: {
            "Content-type": "application/json",
          }
        })
          .then(callback1)
      }}
    >Signin 
  </Button>
      </Card>
    </div>
    </div>
}


