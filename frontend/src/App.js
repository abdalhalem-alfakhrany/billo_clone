import axios from "./api/axios";
import { Routes, Route, Link } from "react-router-dom";
import { AuthPage } from "./pages/auth_page";
import { VideoPage } from "./pages/video_page";

export default function App() {

  const handelLogout = async () => {
    try {
      await axios.post("/logout");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1> Main </h1>
      <nav>
        <ul>
          <li><Link to='/auth'>Login</Link></li>
          <li><Link to='/video'>Video</Link></li>
        </ul>
      </nav>
      <Routes>
        {/* <Route path='/' element={<App />} /> */}
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/video' element={<VideoPage />} />
      </Routes>
      <button onClick={handelLogout}>logout</button>
    </div>
  );
}