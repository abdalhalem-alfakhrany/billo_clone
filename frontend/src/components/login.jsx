import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../reuseable_components/form_input_component";
import axios from "../api/axios";

export function Login({ setAuthenticatedUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handelLogin = async () => {
    try {
      await axios.post("login", { email, password }).then((res) => {
        console.log("you logged in");
        console.info(res.data.data.role);
        setAuthenticatedUser(res.data.data);
        if (res.data.data.role === "creator") {
          navigate("/video");
        } else if (res.data.data.role === "user") {
          navigate("/");
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center w-1/2 bg-gray-200 rounded-md m-10">
      <Input state={email} setState={setEmail} type="email" label="Email" />
      <Input state={password} setState={setPassword} type="password" label="Password" />
      <button className="bg-primary text-white rounded-md text-2xl w-1/3 m-5" onClick={handelLogin}>
        Login
      </button>
    </div>
  );
}
