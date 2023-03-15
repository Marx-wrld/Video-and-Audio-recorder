import "./App.css";
import { useState, useRef } from "react";
import VideoRecorder from "../src/VideoRecorder";
import AudioRecorder from "../src/AudioRecorder";
import { BsFillMoonStarsFill } from "react-icons/bs";

const App = () => {
  let [recordOption, setRecordOption] = useState("video");
 
  const toggleRecordOption = (type) => {
    return () => {
      setRecordOption(type);
    };
  };
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <div>
      <div className={darkMode ? "" : "dark"}>
        <ul>
          <li>
            <BsFillMoonStarsFill
              onClick={() => setDarkMode(!darkMode)}
              className=" cursor-pointer text-2xl"
            />
          </li>
          </ul>
      <div className="button-flex">
        <button onClick={toggleRecordOption("video")}>
          Record Video
        </button>
        <button onClick={toggleRecordOption("audio")}>
          Record Audio
        </button>
      </div>
      <div>
      {recordOption === "video" ? <VideoRecorder/> : <AudioRecorder/>}
      </div>
    </div>
    </div>
  );
};

export default App;
