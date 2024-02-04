import { useState } from "react"
import axios from "../api/axios";

export function FileUpload() {
    const [video_file, setVideoFile] = useState(null);
    const [video_title, setVideoTitle] = useState('');
    const [errors, setErrors] = useState({});
    const [progress, setProgress] = useState(0);

    const handelFileUpload = async () => {
        try {
            let formData = new FormData();
            formData.append('video', video_file);
            formData.append('video_title', video_title);
            await axios.post(
                "/api/video",
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    onUploadProgress: (e) => {
                        const percentCompleted = Math.round((e.loaded * 100) / e.total);
                        setProgress(percentCompleted);
                        if (e.loaded === e.total) {
                            setProgress(0);
                        }
                    }
                })
                .then((res) => {
                    console.info(res.data);
                    setErrors({});
                })
                .catch((error) => {
                    const res = error.response;
                    switch (res.status) {
                        case 401:
                            console.log('unauthorized');
                            break;
                        case 422:
                            console.log('data error');
                            break;
                        case 413:
                            console.log('data too big');
                            break;
                        default:
                            break;
                    }
                    setErrors(res.data);
                    console.error(res.data);
                })

        } catch (error) {
            console.error(error);
        }
    }

    const handelFileSelect = (e) => {
        const file = e.target.files[0];
        if (file.size > 8388608) {
            // errors['video'] = 'file to large';
            setErrors({ 'video': 'file to large' });
            e.target.files = null;
        } else {
            setVideoFile(file);
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>

            <label>video</label>
            <input onChange={handelFileSelect} type="file" />
            <h3>{errors['video']}</h3>

            <label>video title</label>
            <input onChange={(e) => setVideoTitle(e.target.value)} type="text" />
            <h3>{errors['video_title']}</h3>

            <progress value={progress} max="100"> {progress}% </progress>

            <button onClick={handelFileUpload}>upload</button>

        </div >
    )
}