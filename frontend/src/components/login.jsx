import { useState } from "react"
import axios from "../api/axios";

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handelLogin = async () => {
        try {
            await axios.post('login', { email, password });
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Email</label>
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" />
            <label>Password</label>
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" />
            <button onClick={handelLogin}>Login</button>
        </div>
    )
}