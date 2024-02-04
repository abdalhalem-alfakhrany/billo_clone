import axios from "./api/axios";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { VideoPage } from "./pages/video_page";
import { Login } from "./components/login";
import { Register } from "./components/register";
import { useState } from "react";
import { LandingPage } from "./pages/landing_page";

export default function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const navigate = useNavigate();

  const handelLogout = async () => {
    try {
      await axios.post("/logout").then((data) => {
        console.log('you logged out');
        navigate("/");
        setAuthenticatedUser(null);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-between">
      <nav className="flex flex-row justify-between p-3 text-2xl">
        <a className="ml-10 p-1 font-bold text-primary" href="/">Billo Clone</a>
        <div>
          {
            (authenticatedUser != null) ?
              <>
                <button className="mr-10 p-1 text-sm hover:bg-gray-300 rounded-md" onClick={handelLogout}>Logout</button>
                <span className="rounded-md bg-primary text-white p-2 text-sm"> {authenticatedUser.name} </span>
              </>
              :
              <>
                <Link className="mr-10 p-1 hover:bg-gray-300 rounded-md" to='/login'>Login</Link>
                <Link className="mr-10 p-1 hover:bg-gray-300 rounded-md" to='/register'>Register</Link>
              </>
          }
        </div>
      </nav>
      <div className="flex flex-col justify-center items-center">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login setAuthenticatedUser={setAuthenticatedUser} />} />
          <Route path="/register" element={<Register setAuthenticatedUser={setAuthenticatedUser} />} />
          <Route path='/video' element={<VideoPage />} />
        </Routes>
      </div>
    </div>
  );
}