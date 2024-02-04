import { useState } from "react"
import axios from "../api/axios";

export function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handelRegister = async () => {
        try {
            await axios.post('register', { name, email, password });
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Name</label>
            <input onChange={(e) => setName(e.target.value)} value={name} type="text" />
            <label>Email</label>
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" />
            <label>Password</label>
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" />
            <button onClick={handelRegister}>Register</button>
        </div>
    )
}