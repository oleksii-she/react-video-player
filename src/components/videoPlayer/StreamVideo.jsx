import React, { useEffect, useRef, useState } from "react";
import RecordRTC from "recordrtc";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { nanoid } from "nanoid";
import { useStore } from "../../store/store";

const StreamVideo = () => {
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState(null);
  const [recording, setRecording] = useState(false);
  const [message, setMessage] = useState("");
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const streamRef = useRef(null);
  const recorderRef = useRef(null);

  const store = useStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const startStream = async (stream) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      streamRef.current = stream;

      videoRef.current.srcObject = stream;
    } catch (error) {
      setError("Доступ до камери заблоковано або сталася помилка.");
      console.error("Error accessing the camera: ", error.message);
    }
  };

  useEffect(() => {
    if (!mounted || !videoRef.current) {
      console.warn("VIDEOJS: Video element не змонтовано!");
      return;
    }

    const player = (playerRef.current = videojs(videoRef.current, {
      autoplay: false,
      controls: true,
      fluid: false,
    }));

    console.log(playerRef.current, "player");
    /* vjs-control-bar */

    startStream();

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

  const startRecording = () => {
    if (!streamRef.current) return;
    recorderRef.current = new RecordRTC(streamRef.current, {
      type: "video",
      mimeType: "video/webm",
    });

    recorderRef.current.startRecording();
    setRecording(true);
  };

  const stopRecording = () => {
    if (recorderRef.current) {
      recorderRef.current.stopRecording(() => {
        const blob = recorderRef.current.getBlob();
        const url = URL.createObjectURL(blob);

        const newVideo = {
          id: nanoid(),
          sources: [{ src: `${url}`, type: "video/mp4" }],
          name: "Stream web camera",
          poster:
            "https://150763658.v2.pressablecdn.com/wp-content/uploads/2021/07/Video_-post-production.webp",
        };
        store.setVideo(newVideo);
        setMessage("To view the record, go to the playlist");
        setRecording(false);
      });
    }
  };

  return (
    <>
      <div className="video-player-wrapper">
        <div className="video-player">
          {error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : (
            <video ref={videoRef} className="video video-js" autoPlay />
          )}
        </div>
        <button onClick={recording ? stopRecording : startRecording}>
          {recording ? "🛑 Stop" : "🎥 Rec"}
        </button>
      </div>
      <p>{message}</p>
    </>
  );
};

export default StreamVideo;
