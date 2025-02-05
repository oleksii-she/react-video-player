import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import videojs from "video.js";
import "jb-videojs-hls-quality-selector";
import "videojs-contrib-quality-levels";
import "videojs-playlist";
import "video.js/dist/video-js.css";

const VideoPlayer = ({ videoList = [] }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [playList, setPlayList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

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
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>MUX Video - Quality Levels</h1>
        <video ref={videoRef} className="video video-js" />
      </div>
      <div>
        {playList.length > 0 && (
          <ul>
            {playList.map((video, index) => (
              <li key={video.playlistItemId_}>
                <button
                  onClick={() => playerRef.current.playlist.currentItem(index)}
                  style={{
                    cursor: "pointer",
                    fontWeight: currentIndex === index ? "bold" : "normal",
                    color: currentIndex === index ? "red" : "blue",
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
