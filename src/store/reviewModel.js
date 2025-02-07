import { t } from "mobx-state-tree";

export const ReviewsModel = t.model("VideoList", {
  id: t.string,
  videoId: t.string,
  description: t.string,
});
