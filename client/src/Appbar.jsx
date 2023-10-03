import {Typography} from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

export default function Appbar() {
  const navigate = useNavigate()
  const [userEmail , setUserEmail] = useState('');

  useEffect(() =>{
    function callback2(data) {
      if(data.username){
        setUserEmail(data.username)
      }
    }
    function callback1(res) {
      res.json().then(callback2);
    }
    fetch("http://localhost:3001/profile", {
      method:"GET", 
      headers :{
        "Authorization" :localStorage.getItem("token"),
        'Success' : true
      }
    }).then(callback1);
  },[])

  if (userEmail) {
    return (
      <div>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 4
        }}>
          <div>
            <Typography variant={"h6"}>Task Todo</Typography>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: 10 }}>
              <Typography variant={"h8"}>{userEmail}</Typography>
            </div>
            <Button
              variant={"contained"}
              onClick={() => {
                localStorage.setItem("token", null);
                navigate('/signin')
                window.location.reload(); 
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
    <div style={{ display: "flex",justifyContent: "space-between",padding: 4 }}>
      <div>
        <Typography variant={"h6"}>Task Todo</Typography>
      </div>

      <div style={{display: "flex"}}>
        <div style={{marginRight: 10}}>
          <Button
            variant={"contained"}
            onClick={() => {
              navigate("/signup")
            }}
          >Signup</Button>
        </div>
        <div>
          <Button
            variant={"contained"}
            onClick={() => {
              navigate("/signin")
            }}
          >Signin</Button>
        </div>
      </div>
    </div>
  </div>
  )
}
