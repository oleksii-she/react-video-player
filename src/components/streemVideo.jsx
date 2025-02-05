import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const StreamVideo = () => {
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !videoRef.current) {
      console.warn("VIDEOJS: Video element не змонтовано!");
      return;
    }

    // Ініціалізація Video.js
    const player = (playerRef.current = videojs(videoRef.current, {
      autoplay: true,
      controls: true,
      fluid: false,
    }));

    // Отримання доступу до вебкамери
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        streamRef.current = stream;
        videoRef.current.srcObject = stream;
      })
      .catch((err) => {
        setError("Доступ до камери заблоковано або сталася помилка.");
        console.error("Error accessing the camera: ", err);
      });

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [mounted]);

  if (!mounted) return <h2>Player is not defined</h2>;

  return (
    <div className="video-player-wrapper">
      <div className="video-player">
        <h1>Live Stream</h1>
        {error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <video
            ref={videoRef}
            className="video video-js"
            autoPlay
            playsInline
          />
        )}
      </div>
    </div>
  );
};

export default StreamVideo;
