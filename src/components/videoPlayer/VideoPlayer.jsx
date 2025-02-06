import "jb-videojs-hls-quality-selector";
import "videojs-playlist";
import "video.js/dist/video-js.css";
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import videojs from "video.js";
import {
  Checkbox,
  CheckboxActive,
  DeleteIcons,
  IconTrackSwitch,
} from "../icons/Icons";

import { useStore } from "../../store/store";

const VideoPlayer = ({ videoList }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playlist, setPlaylist] = useState([]);
  const [checkId, setCheckId] = useState("");
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  const { deleteVideo } = useStore();

  const options = {
    autoplay: false,
    controls: true,
    preload: "auto",
    playbackRates: [0.5, 1, 1.5, 2, 2.5],
    userActions: { hotkeys: true },
    controlBar: {
      skipButtons: {
        forward: 10,
        backward: 10,
      },
    },
    plugins: { hlsQualitySelector: {} },
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        handlePlayerReady(player);
      }));

      player.playlist(videoList);
      setPlaylist(videoList);
      player.playlist.autoadvance(0);
      player.on("playlistitem", () => {
        setCurrentIndex(player.playlist.currentItem());
      });
    } else {
      const player = playerRef.current;
      player.playlist(videoList);
      setPlaylist(videoList);
      player.playlist.autoadvance(0);
      player.on("playlistitem", () => {
        setCurrentIndex(player.playlist.currentItem());
      });
    }
  }, [videoList, videoRef]);

  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div className="video-player-wrapper">
      <div className="video-player">
        <div ref={videoRef} className="video video-js" />
        {currentIndex > 0 && (
          <button
            className="button-prev"
            onClick={() => {
              playerRef.current.playlist.previous();
            }}
          >
            <IconTrackSwitch className={"icon-prev"} />
          </button>
        )}

        {currentIndex !== playlist.length - 1 && (
          <button
            className="button-next"
            onClick={() => playerRef.current.playlist.next()}
          >
            <IconTrackSwitch className={"icon-next"} />
          </button>
        )}
      </div>

      <div className="play-list-wrapper">
        {playlist.length > 0 ? (
          <ol className="play-list">
            {playlist.map((video, index) => (
              <li
                key={video.id}
                className={currentIndex === index ? `active-track ` : ``}
              >
                <button
                  className="button-checkbox"
                  onClick={() => {
                    setCheckId(video.id);
                    if (checkId === video.id) {
                      setCheckId("");
                    } else {
                      setCheckId(video.id);
                    }
                  }}
                >
                  <Checkbox />
                  <CheckboxActive
                    className={checkId === video.id ? `check active` : `check`}
                  />
                </button>
                <button
                  onClick={() => {
                    playerRef.current.playlist.currentItem(index);
                  }}
                >
                  {`${video.name}`}
                </button>
              </li>
            ))}
          </ol>
        ) : (
          <h2 className="playlist-empty">The playlist is empty</h2>
        )}

        {videoList.length > 0 && (
          <button
            className="delete-btn"
            onClick={() => {
              if (checkId) {
                deleteVideo(checkId);
                setCheckId("");
              }
            }}
          >
            <DeleteIcons
              className={checkId ? `delete-icon active` : `delete-icon`}
            />
          </button>
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
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default VideoPlayer;
