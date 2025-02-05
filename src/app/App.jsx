import React from "react";
import { useState } from "react";
import "./App.css";
import VideoPlayer from "../components/videoPlayer/VideoPlayer";
import StreamVideo from "../components/streemVideo";
const videoId = "isayJHvG4EvPVPTMTQtBKbzHTXoB5rTZJ41g2IYttPo";

const src = `https://stream.mux.com/${videoId}.m3u8`;
const videoList = [
  {
    sources: [
      {
        src: src,
      },
    ],
    name: "HLS Stream 1",
    poster: "https://www.videojs.com/img/poster.jpg",
  },
  {
    sources: [
      {
        src: "https://vz-cea98c59-23c.b-cdn.net/c309129c-27b6-4e43-8254-62a15c77c5ee/playlist.m3u8",
        type: "application/x-mpegURL",
      },
    ],
    name: "HLS Stream",
    poster: "https://www.videojs.com/img/poster.jpg",
    type: "application/x-mpegURL",
  },
  {
    sources: [
      {
        src: "http://media.w3.org/2010/05/sintel/trailer.mp4",
        type: "video/mp4",
      },
    ],
    name: "Sintel Trailer",
    poster: "http://media.w3.org/2010/05/sintel/poster.png",
  },
  {
    sources: [{ src: "http://vjs.zencdn.net/v/oceans.mp4", type: "video/mp4" }],
    name: "Oceans",
    poster: "http://www.videojs.com/img/poster.jpg",
  },
  {
    sources: [
      {
        src: "http://media.w3.org/2010/05/video/movie_300.mp4",
        /*        type: "video/mp4", */
      },
    ],
    name: "Movie 300",
    poster: "http://media.w3.org/2010/05/video/poster.png",
  },
];

export const App = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="app-box">
      <div className="toggle-wrapper">
        <button
          className={toggle ? `block-btn` : `active`}
          onClick={() => setToggle(true)}
        >
          go live stream
        </button>
        <button
          className={!toggle ? `block-btn` : `active`}
          onClick={() => setToggle(false)}
        >
          go live stream
        </button>
      </div>
      <div className="container">
        <div>
          {!toggle ? <VideoPlayer videoList={videoList} /> : <StreamVideo />}
        </div>
      </div>
    </div>
  );
};

export default App;
