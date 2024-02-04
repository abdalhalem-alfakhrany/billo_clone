import { useState } from "react";
import { FileUpload } from "../components/file_upload";
import axios from "../api/axios";

export function VideoPage() {
  const [videos, setVideos] = useState([{}]);
  const getVideos = async () => {
    try {
      await axios.get("/api/video/").then((res) => {
        console.log(res);
        setVideos(res.data.data);
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex w-full">
      <div className="w-1/2">
        <button onClick={getVideos}>load</button>
        <table className="table ">
          <thead>
            <tr>
              <th>Video Title</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video, idx) => {
              return (
                <tr key={idx}>
                  <td>{video.title}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="w-1/2">
        <FileUpload />
      </div>
    </div>
  );
}
