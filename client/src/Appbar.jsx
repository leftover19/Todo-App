import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Appbar() {
    const navigate = useNavigate()
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://54.196.215.241:3001/profile", {
                    headers: {
                        "Authorization": localStorage.getItem("token"),
                        "Success": true,
                    }
                });
                const data = await response.json();
                if (data.username) {
                    setUserEmail(data.username);
                }
            } catch (err) {
                console.error("Error fetching data: ", err)
            }
        }
        fetchData();
    }, [])

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
            <div style={{ display: "flex", justifyContent: "space-between", padding: 4 }}>
                <div>
                    <Typography variant={"h6"}>Task Todo</Typography>
                </div>

                <div style={{ display: "flex" }}>
                    <div style={{ marginRight: 10 }}>
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
