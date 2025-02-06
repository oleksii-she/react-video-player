import { useState, useRef } from "react";
import { observer } from "mobx-react-lite";

import { toJS } from "mobx";
import "./App.css";
import { useStore } from "../store/store";
import VideoPlayer from "../components/videoPlayer/VideoPlayer";
import StreamVideo from "../components/videoPlayer/StreamVideo";
import { AddVideo } from "../components/input/AddVideo";

export const App = observer(() => {
  const [toggle, setToggle] = useState(false);
  const rootStore = useStore();

  return (
    <div className="app-box">
      <div className="toggle-wrapper">
        <button
          className={toggle ? `block-btn` : `active`}
          onClick={() => setToggle(true)}
        >
          Go to live stream
        </button>
        <button
          className={!toggle ? `block-btn` : `active`}
          onClick={() => setToggle(false)}
        >
          Go to playlist
        </button>
      </div>
      <div className="container">
        <div>
          {!toggle ? (
            <div>
              <div className="playlist-container">
                <h2>Playlist</h2>
                <AddVideo />
              </div>
              <VideoPlayer videoList={toJS(rootStore.list)} />
            </div>
          ) : (
            <div>
              <div className="playlist-container">
                <h2>Live player</h2>
              </div>
              <StreamVideo />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default App;
