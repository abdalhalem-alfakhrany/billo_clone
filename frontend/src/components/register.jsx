import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { Input } from "../reuseable_components/form_input_component";

export function Register({ setAuthenticatedUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handelRegister = async () => {
    try {
      await axios.post("register", { name, email, password, role }).then((res) => {
        console.log("you are registered ");
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
    <div className="flex flex-col justify-center w-1/2 items-center bg-gray-200 rounded-md m-10">
      <Input state={name} setState={setName} type="text" label="Name" />
      <Input state={email} setState={setEmail} type="email" label="Email" />
      <Input state={password} setState={setPassword} type="password" label="Password" />

      <div>
        <label htmlFor="creator-role">Creator</label>
        <input
          onClick={(e) => setRole("creator")}
          className="mr-3"
          type="radio"
          id="creator-role"
          name="role"
          value="creator"
        />

        <label htmlFor="user-role">User</label>
        <input onClick={(e) => setRole("user")} type="radio" id="user-role" name="role" value="user" />
      </div>

      <button className="bg-primary text-white rounded-md text-2xl w-1/3 m-5" onClick={handelRegister}>
        Register
      </button>
    </div>
  );
}
