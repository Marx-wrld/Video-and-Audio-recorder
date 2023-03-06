import { useState, useRef} from "react";

//similar to the audiorecorder the videorecorder, the code block below also;
// declares the UI for the video recorder components
//receives microphone permissions from the browser using the getCameraPermission function
//sets the MediaStream received from the getUserMedia method to the stream state variable

const mimeType = 'video/webm; codecs="opus,vp8"';


const VideoRecorder = () => {
    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState(null);
    const mediaRecorder = useRef(null);
    const liveVideoFeed = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [recordedVideo, setRecordedVideo] = useState(null);
    const [videoChunks, setVideoChunks] = useState([]);

    const getCameraPermission = async () => {
        if ("MediarRecorder" in window) {
            try{
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: true,
                });
                setPermission(true);
                setStream(streamData);
            }catch(err) {
                alert(err.message)
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    const startRecording = async() => {

        setRecordingStatus("recording");
        const media = new MediaRecorder(stream, { mimeType });
        mediaRecorder.current = media;
        mediaRecorder.current.start();

        let localVideoChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            localVideoChunks.push(event.data);
        };

        setVideoChunks(localVideoChunks);
    };

    const stopRecording = () => {
        setPermission(false);
        setRecordingStatus("inactive");
        mediaRecorder.current.stop();

        mediaRecorder.current.onstop = () => {
            const videoBlob = new Blob(videoChunks, { type: mimeType });
            const videoUrl = URL.createObjectURL(videoBlob);


            setRecordedVideo(videoUrl);
            setVideoChunks([]);
        };
    };

    return (
        <div>
            <h2>Video Recorder</h2>
            <main>
                <div className="video-controls">
                    {!permission ? (
                        <button onClick={getCameraPermission} type="button">
                            Get Camera
                        </button>
                    ): null}
                    {permission && recordingStatus === "inactive" ? (
                        <button onClick={startRecording} type="button">
                           Start Recording
                        </button>
                    ): null}
                    {recordingStatus === "recording" ? (
                        <button onClick={stopRecording} type="button">
                            Stop Recording
                        </button>
                    ) : null}
                </div>
            </main>

            <div className="video-player">

                {!recordedVideo ? (
                    <video ref={liveVideoFeed} autoPlay className="live-player">
                        
                    </video>
                ) : null }

                {recordedVideo ? (
                    <div className="recorded-player">
                        <video className="recorded" src={recordedVideo} controls>

                        </video>
                        <a download href={recordedVideo}>
                            Download Recording
                        </a>
                    </div>
                ) : null}
            </div>
       </div>

    );
};

export default VideoRecorder