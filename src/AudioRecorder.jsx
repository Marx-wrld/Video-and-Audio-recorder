import { useState, useRef } from "react";

const mimeType = "audio/webm";

const AudioRecorder = () => {

    const [permission, setPermission] = useState(false); //uses a boolean value to indicate whether user permission has been given
    const mediaRecorder = useRef(null)//holds the data from creating a new MediaRecorder object, given a mediastream to record
    const [recordingStatus, setRecordingStatus] = useState("inactive");//sets the current recording status of the recorder. The possible values are recording, inactive and paused
    const [stream, setStream] = useState(null); //contains the mediastream received from the getusermedia method
    const [audioChunks, setAudioChunks] = useState([]);//contains encoded chunks of the audio recording
    const [audio, setAudio] = useState(null); //contains a blob URL of the finished audio recording

    const getMicrophonePermission = async () => {

        //Receiving microphone permissions using the function getMicrophonePermission
        if ("MediaRecorder" in window){
            try{
                const streamData = await navigator.mediaDevices.getUserMedia(
                //sets MediaStream received from the navigator.mediaDevices.getUserMedia function to the stream state variable
                {
                    audio: true,
                    video: false,
                });
                setPermission(true);
                setStream(streamData);
            }
            catch(err) {
                alert(err.message);
            }
        }else{
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };
    const startRecording = async() => {
        setRecordingStatus("recording");
        //create new Media recorder instance using the stream
        const media = new MediaRecorder(stream, { type: mimeType});
        //set the Media Recorder i
    }


    return (
        <div>
            <h2>Audio Recorder</h2>
            <main>
                <div className="audio-controls">
                    {!permission ? (
                        <button onClick={getMicrophonePermission} type="button">
                            Get Microphone
                        </button>
                    ): null}
                    {permission ? (
                        <button type="button">
                            Record
                        </button>
                    ): null}
        </div>
        </main>
        </div>
    )
};
export default AudioRecorder;
