import { useState } from "react";
import { Input } from "../reuseable_components/form_input_component";
import axios from "../api/axios";

export function FileUpload() {
  const [video_file, setVideoFile] = useState(null);
  const [video_title, setVideoTitle] = useState("");
  const [errors, setErrors] = useState({});
  const [progress, setProgress] = useState(0);

  const handelFileUpload = async () => {
    try {
      let formData = new FormData();
      formData.append("video", video_file);
      formData.append("video_title", video_title);
      await axios
        .post("/api/video", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (e) => {
            const percentCompleted = Math.round((e.loaded * 100) / e.total);
            setProgress(percentCompleted);
            if (e.loaded === e.total) {
              setProgress(0);
              setVideoFile("");
              setVideoTitle("");
            }
          },
        })
        .then((res) => {
          console.info(res.data);
          setErrors({});
        })
        .catch((error) => {
          const res = error.response;
          switch (res.status) {
            case 401:
              console.log("unauthorized");
              break;
            case 422:
              console.log("data error");
              break;
            case 413:
              console.log("data too big");
              break;
            default:
              break;
          }
          setErrors(res.data);
          console.error(res.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handelFileSelect = (e) => {
    const file = e.target.files[0];
    if (file.size > 8388608) {
      // errors['video'] = 'file to large';
      setErrors({ video: "file to large" });
      e.target.files = null;
    } else {
      setVideoFile(file);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="w-full p-5">
        <label>video</label>
        <input value={video_file} onChange={handelFileSelect} type="file" />
        <h3>{errors["video"]}</h3>
      </div>

      <Input className="w-full p-5" state={video_title} setState={setVideoTitle} type="text" label="Title" />

      <progress className="w-full" value={progress} max="100">
        {" "}
        {progress}%{" "}
      </progress>

      <button className="bg-primary text-white rounded-md text-2xl w-1/3 m-5" onClick={handelFileUpload}>
        upload
      </button>
    </div>
  );
}
