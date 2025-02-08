import { useState } from "react";
import { observer } from "mobx-react-lite";
import { nanoid } from "nanoid";
import { useStore } from "../../store/store";

export const AddVideo = observer(() => {
  const [urlVideo, setUrlVideo] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const store = useStore();

  const videoUrlRegex = /^(https?:\/\/.*\.(mp4|webm|ogg|m3u8|mpd)(\?.*)?)$/i;
  const isValidVideoUrl = (url) => videoUrlRegex.test(url);
  const submit = (e) => {
    e.preventDefault();
    if (urlVideo.length === 0) return;
    const valid = isValidVideoUrl(urlVideo);

    if (!valid) return setError("URL is not valid");

    const newVideo = {
      id: nanoid(),
      sources: [{ src: urlVideo, type: "" }],
      name: name || "Unknown",
      poster:
        "https://150763658.v2.pressablecdn.com/wp-content/uploads/2021/07/Video_-post-production.webp",
    };

    store.setVideo(newVideo);
  };
  return (
    <form onSubmit={submit} className="form-video">
      <input
        type="text"
        placeholder="url"
        value={urlVideo}
        onChange={(e) => setUrlVideo(e.target.value)}
      />
      <input
        type="text"
        value={name}
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Add video</button>
      <p>{error}</p>
    </form>
  );
});
