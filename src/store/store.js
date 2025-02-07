import { t } from "mobx-state-tree";
import { VideoModel } from "./VideoModel";
import { RatingModel } from "./ratingModel";
import { ReviewsModel } from "./reviewModel";
import { nanoid } from "nanoid";
export const RootStore = t
  .model("RootStore", {
    list: t.array(VideoModel),
    ratings: t.array(RatingModel),
    reviews: t.array(ReviewsModel),
    currentPlayVideo: t.maybeNull(t.string),
    rating: t.maybeNull(t.number),
  })
  .views((store) => ({
    get getReviews() {
      if (!store.currentPlayVideo) return [];

      const reviews = store.reviews.filter(
        (review) => review.videoId === store.currentPlayVideo
      );

      if (!reviews) {
        return [];
      }
      return reviews;
    },
    get getRatings() {
      if (!store.currentPlayVideo) return [];

      const rating = store.ratings.filter(
        (review) => review.videoId === store.currentPlayVideo
      );

      if (!rating[0]) {
        return [];
      }

      return rating[0].ratings;
    },
  }))
  .actions((store) => ({
    setVideo(newVideo) {
      store.list.replace([...store.list, newVideo]);
    },

    setReviews(comment) {
      if (!comment) return;
      const newComment = {
        id: nanoid(),
        videoId: store.currentPlayVideo,
        description: comment,
      };

      store.reviews.replace([...store.reviews, newComment]);
    },
    setRating(rating) {
      if (!store.currentPlayVideo) {
        console.log("video is not defined");
        return;
      }
      const ratingIndex = store.ratings.findIndex(
        (el) => el.videoId === store.currentPlayVideo
      );

      if (ratingIndex === -1) {
        store.ratings.push({
          id: nanoid(),
          videoId: store.currentPlayVideo,
          ratings: [rating],
        });
        store.rating = null;
      } else {
        store.ratings[ratingIndex].ratings.push(rating);
        store.rating = null;
      }
    },

    deleteVideo(id) {
      const str = [...store.list];
      const filter = str.filter((el) => el.id !== id);
      store.list = filter;
    },

    setCurrentVideo(id) {
      store.currentPlayVideo = id;
    },
  }));

const defaultReviews = [
  {
    id: "1",
    videoId: "1",
    description: "Дуже сильно чекаю на це кіно",
  },
  {
    id: "2",
    videoId: "2",
    description: "Дуже гарний пейзаж",
  },
];

const defaultRatings = [
  {
    id: "1",
    videoId: "1",
    ratings: [1, 1, 0, 1, 1, 0],
  },
  {
    id: "2",
    videoId: "2",
    ratings: [1, 1, 0, 1],
  },
];

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
      ratings: [...defaultRatings],
      reviews: [...defaultReviews],
      currentPlayVideo: null,
    });
  }

  return rootStore;
};
