import { t } from "mobx-state-tree";
import { VideoListModel } from "./videoListModel";

export const RootStore = t
  .model("RootStore", {
    list: t.array(VideoListModel),
  })
  .actions((store) => ({
    setVideo(newVideo) {
      store.list.replace([...store.list, newVideo]); // Оновлює цілий масив
    },

    deleteVideo(id) {
      const str = [...store.list];
      const filter = str.filter((el) => el.id !== id);
      store.list = filter;
    },
  }));

const defaultList = [
  {
    id: "1",
    sources: [
      {
        src: "https://stream.mux.com/isayJHvG4EvPVPTMTQtBKbzHTXoB5rTZJ41g2IYttPo.m3u8",
        type: "application/x-mpegURL",
      },
    ],
    name: "HLS Stream 1",
    poster: "https://www.videojs.com/img/poster.jpg",
  },
  {
    id: "2",
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
    id: "3",
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
    id: "4",
    sources: [{ src: "http://vjs.zencdn.net/v/oceans.mp4", type: "video/mp4" }],
    name: "Oceans",
    poster: "http://www.videojs.com/img/poster.jpg",
  },
  {
    id: "5",
    sources: [
      {
        src: "http://media.w3.org/2010/05/video/movie_300.mp4",
        type: "video/mp4",
      },
    ],
    name: "Movie 300",
    poster: "http://media.w3.org/2010/05/video/poster.png",
  },
];

let rootStore;

export const useStore = () => {
  if (!rootStore) {
    rootStore = RootStore.create({
      list: [...defaultList],
    });
  }

  return rootStore;
};
