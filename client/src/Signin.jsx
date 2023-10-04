import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {Card, Typography} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil';
import {emailState, passwordState}  from './RecoilAtoms/atomStates'
import axios from 'axios';

function SignInButt () {

  const [email , setEmail] = useRecoilState(emailState);
  const password = useRecoilState(passwordState);
  const navigate = useNavigate();
  return (
    <RecoilRoot>
      <Button 
      size={"large"} 
      variant="contained"
      onClick={() =>{
        function callback2(data) {
          localStorage.setItem("token" , "Bearer " + data.token)
          navigate(`/todo/${email}`)
          window.location.reload()
        }
        function callback1(res) {
          res.json().then(callback2)
        }
        axios.post('http://54.196.215.241:3001/signin' || "http://localhost:3001/signin", {
          body : JSON.stringify({
            username : email,
            password
          }),
          // headers: {
          //   "Content-type": "application/json",
          // }
        })
          .then(callback1)
      }}
    >Signin 
    </Button>
    </RecoilRoot>
  )
}

function EnterPassword () {
  const  setPassword  = useSetRecoilState(passwordState)
  return (
    <RecoilRoot>
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
    </RecoilRoot>
  )
}

function EnterEmail () {
  const  setEmail  = useSetRecoilState(emailState)
  return (
    <RecoilRoot>
      <TextField fullWidth={true} id="outlined-basic"label="Email"variant="outlined"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
    </RecoilRoot>
  )
}

export default function Signin() {

  return <RecoilRoot> 
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
        <EnterEmail />
        <br/><br/>
        <EnterPassword />
        <br/><br/>
        <SignInButt />
      </Card>
    </div>
    </RecoilRoot>
}


