import { t } from "mobx-state-tree";

export const RatingModel = t.model("VideoList", {
  id: t.string,
  videoId: t.string,
  ratings: t.array(t.number),
});
