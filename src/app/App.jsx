import { useState } from "react";
import { observer } from "mobx-react-lite";

import { toJS } from "mobx";
import "./App.css";
import { useStore } from "../store/store";
import VideoPlayer from "../components/videoPlayer/VideoPlayer";
import StreamVideo from "../components/videoPlayer/StreamVideo";
import { AddVideo } from "../components/fornVideo/AddVideo";
import { Reviews } from "../components/reviews/Reviews";
import { AddReview } from "../components/reviews/AddReviewForm";
import { Rating } from "../components/Rating";
export const App = observer(() => {
  const [toggle, setToggle] = useState(false);
  const rootStore = useStore();

  return (
    <>
      <header>
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
      </header>
      <div className="container main">
        <div className="pt-40">
          {!toggle ? (
            <div>
              <div className="playlist-container pb-40">
                <AddVideo />
              </div>

              <div className="pb-40">
                <VideoPlayer videoList={toJS(rootStore.list)} />
              </div>
              <div className="pb-40">
                <Rating />
              </div>

              <div className="pb-40">
                <AddReview />
              </div>
              <div className="pb-40">
                <Reviews />
              </div>
            </div>
          ) : (
            <div>
              <div className="playlist-container ">
                <h2>Live player</h2>
              </div>
              <StreamVideo />
            </div>
          )}
        </div>
      </div>
    </>
  );
});

export default App;
