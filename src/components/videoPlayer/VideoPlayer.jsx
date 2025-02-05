import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import videojs from "video.js";
import "jb-videojs-hls-quality-selector";
import "videojs-contrib-quality-levels";
import "videojs-playlist";
import "video.js/dist/video-js.css";

import StreamVideo from "../streemVideo";
const VideoPlayer = ({ videoList = [] }) => {
  const [playList, setPlayList] = useState([]);
  const [videoStream, setVideoStram] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [toggle, setToggle] = useState(true);
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !videoRef.current) {
      console.warn("VIDEOJS: Video element не змонтовано!");
      return;
    }
    const video = videoRef.current;

    const player = (playerRef.current = videojs(video, {
      autoplay: false,
      controls: true,
      preload: "auto",
      playbackRates: [0.5, 1, 1.5, 2, 2.5],
      userActions: {
        hotkeys: true,
      },
      plugins: {
        hlsQualitySelector: {},
      },
    }));

    if (videoList.length > 0) {
      player.playlist(videoList);

      setPlayList(player.playlist(videoList));

      player.playlist.autoadvance(0);

      playerRef.current.on("playlistitem", () => {
        setCurrentIndex(playerRef.current.playlist.currentItem());
      });
    }

    return () => {
      if (player) {
        console.log("VIDEOJS: Disposing player...");
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [mounted, videoList]);

  if (!mounted) return <h2>Player is not defined</h2>;
  return (
    <div className="video-player-wrapper">
      <div className="video-player">
        <video ref={videoRef} className="video video-js" />
      </div>

      <div>
        {videoList.length > 0 && (
          <ul className="play-list">
            {videoList.map((video, index) => (
              <li
                key={video.playlistItemId_}
                className={currentIndex === index ? `active-track ` : ``}
              >
                <button
                  onClick={() => {
                    setToggle(true);
                    playerRef.current.playlist.currentItem(index);
                  }}
                >
                  {video.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

VideoPlayer.propTypes = {
  videoList: PropTypes.arrayOf(
    PropTypes.shape({
      sources: PropTypes.arrayOf(
        PropTypes.shape({
          src: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
        })
      ).isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default VideoPlayer;
/* {
                    cursor: "pointer",
                    fontWeight: currentIndex === index ? "bold" : "normal",
                    color: currentIndex === index ? "red" : "blue",
                  } */
