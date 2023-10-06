import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil';
import { emailState, passwordState } from './RecoilAtoms/atomStates'
import axios from 'axios';

function SignInButt() {

    const [email] = useRecoilState(emailState);
    const [password] = useRecoilState(passwordState);
    const navigate = useNavigate();
    return (
        <RecoilRoot>
            <Button
                size={"large"}
                variant="contained"
                onClick={async () => {
                    try {
                        const response = await axios.post('http://54.196.215.241:3001/signin', {
                            username: email,
                            password,
                        });
                        const data = await response.json();

                        localStorage.setItem("token", "Bearer " + data.body.token);
                        navigate(`/todo/${email}`);
                        window.location.reload();
                    } catch (err) {
                        console.error("Error during sign-in:", err);
                    }
                }}
            >Signin
            </Button>
        </RecoilRoot>
    )
}

function EnterPassword() {
    const setPassword = useSetRecoilState(passwordState)
    return (
        <RecoilRoot>
            <TextField
                fullWidth={true}
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type={"password"}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
        </RecoilRoot>
    )
}

function EnterEmail() {
    const setEmail = useSetRecoilState(emailState)
    return (
        <RecoilRoot>
            <TextField fullWidth={true} id="outlined-basic" label="Email" variant="outlined"
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
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Card varint={"outlined"} style={{ width: 400, padding: 20 }}>
                <EnterEmail />
                <br /><br />
                <EnterPassword />
                <br /><br />
                <SignInButt />
            </Card>
        </div>
    </RecoilRoot>
}


