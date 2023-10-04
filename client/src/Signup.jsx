import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {Card, Typography} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil';
import { emailState, passwordState } from './RecoilAtoms/atomStates';
import axios from 'axios';

function SignUpBut () {

  const [email] = useRecoilState(emailState);
  const [password] = useRecoilState(passwordState);
  const navigate = useNavigate();
  return (
    <RecoilRoot>
      <Button 
        size={"large"} 
        variant="contained"
        onClick={() =>{
          function callback2(data) {
            localStorage.setItem("token" , "Bearer " +  data.token)
            navigate(`/todo/${email}`)
            window.location.reload();
          }
          function callback1(res) {
            res.json().then(callback2)
          }
          axios.post('http://54.196.215.241:3001/signup' || "http://localhost:3001/signup", {
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
      >Signup 
      </Button>
    </RecoilRoot>
  )
}

function EnterEmail () {
  const setEmail = useSetRecoilState(emailState)
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


function EnterPassword () {
  const setPassword = useSetRecoilState(passwordState)
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

export default function Signup() {

  return <RecoilRoot> 
    <div style={{
      paddingTop: 150,
      marginBottom: 10,
      display: "flex",
      justifyContent: "center"
    }}>
      <Typography variant={"h6"}>
        Welcome to Todo App. Sign up below
      </Typography>
    </div>
    <div style={{display: "flex", justifyContent: "center"}}>
      <Card variant={"outlined"} style={{width: 400, padding: 20}}>
        <EnterEmail />
        <br/><br/>
        <EnterPassword /> 
        <br/><br/>
        <SignUpBut />
      </Card>
    </div>
  </RecoilRoot>
}


