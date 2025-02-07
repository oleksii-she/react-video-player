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
  const steamWrapperWrapperRef = useRef(null);

  const store = useStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const startStream = async () => {
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

  const startRecording = () => {
    setMessage(" ");
    if (!streamRef.current) return;
    recorderRef.current = new RecordRTC(streamRef.current, {
      type: "video",
      mimeType: "video/webm",
    });

    recorderRef.current.startRecording();
    setRecording(true);
  };

  const takeSnapshot = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const imageURL = canvas.toDataURL("image/png");
    return imageURL;
  };

  const stopRecording = () => {
    if (recorderRef.current) {
      recorderRef.current.stopRecording(() => {
        const blob = recorderRef.current.getBlob();
        const url = URL.createObjectURL(blob);
        const snapshot = takeSnapshot();
        const newVideo = {
          id: nanoid(),
          sources: [{ src: `${url}`, type: "video/mp4" }],
          name: "Stream web camera",
          poster: `${snapshot}`,
        };
        store.setVideo(newVideo);

        setMessage("To view the record, go to the playlist");
        setRecording(false);
      });
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

    startStream();

    const elementControlBar = window.document.querySelector(".vjs-control-bar");

    player.ready(() => {
      if (elementControlBar) {
        const button = document.createElement("button");
        button.innerText = "🎥 Rec";
        button.className =
          "button-rec vjs-fullscreen-control vjs-control vjs-button";

        button.addEventListener("click", () => {
          setRecording((prevRecording) => {
            if (prevRecording) {
              console.log(prevRecording, "recording true");
              stopRecording();
              button.innerText = "🎥 Rec";
            } else {
              startRecording();
              console.log(prevRecording, "recording false");
              button.innerText = "🛑 Stop";
            }
            return !prevRecording; // Оновлюємо стан
          });
        });

        elementControlBar.insertBefore(button, elementControlBar.firstChild);
      }
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

  const buttonRec = window.document.querySelector("button-rec");

  useEffect(() => {
    console.log(buttonRec, "buttonRec");
  }, [buttonRec]);

  if (!mounted) return <h2>Player is not defined</h2>;

  return (
    <div className="video-player-wrapper">
      <div ref={steamWrapperWrapperRef} className="stream-player">
        {error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <video ref={videoRef} className="video video-js" autoPlay />
        )}
        <p className="message-record">{message}</p>
      </div>
    </div>
  );
};

export default StreamVideo;
